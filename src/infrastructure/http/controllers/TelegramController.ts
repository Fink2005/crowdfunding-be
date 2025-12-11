import { TelegramWebhookDto } from "@/application/dto/telegram/TelegramWebhookDto";
import { GetTelegramLinkPort } from "@/application/ports/in/telegram/GetTelegramLinkPort";
import { HandleTelegramWebhookPort } from "@/application/ports/in/telegram/HandleTelegramWebhookPort";
import { SendTelegramNotificationPort } from "@/application/ports/in/telegram/SendTelegramNotificationPort";
import { NextFunction, Request, Response } from "express";

export class TelegramController {
  constructor(
    private readonly getTelegramLinkUseCase: GetTelegramLinkPort,
    private readonly handleTelegramWebhookUseCase: HandleTelegramWebhookPort,
    private readonly sendTelegramNotificationUseCase: SendTelegramNotificationPort
  ) {}

  async getLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const address = req.query.address as string;

      const { url } = await this.getTelegramLinkUseCase.execute(address);

      res.status(200).json(url);
    } catch (error) {
      next(error);
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const webhookData: TelegramWebhookDto = req.body;
      console.log("vao");
      const result = await this.handleTelegramWebhookUseCase.execute(webhookData);

      res.status(200).json({
        success: result.success,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address, message } = req.body;

      if (!address || !message) {
        res.status(400).json({
          success: false,
          message: "Address and message are required",
        });
        return;
      }

      const result = await this.sendTelegramNotificationUseCase.execute({ address, message });

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
