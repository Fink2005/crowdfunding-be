import { TelegramWebhookDto } from "@/application/dto/TelegramWebhookDto";
import { GetTelegramLinkPort } from "@/application/ports/in/GetTelegramLinkPort";
import { HandleTelegramWebhookPort } from "@/application/ports/in/HandleTelegramWebhookPort";
import { NextFunction, Request, Response } from "express";

export class TelegramController {
  constructor(
    private readonly getTelegramLinkUseCase: GetTelegramLinkPort,
    private readonly handleTelegramWebhookUseCase: HandleTelegramWebhookPort
  ) {}

  async getLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const address = req.query.address as string;

      const { url } = await this.getTelegramLinkUseCase.execute(address);
      console.log(url);

      res.redirect(url);
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
}
