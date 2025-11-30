import { GetMessageWithNonceReqDto } from "@/application/dto/GetMessageWithNonceDto";
import { LoginWalletDto } from "@/application/dto/LoginWalletDto";
import { GetMessageWithNonceUseCasePort } from "@/application/ports/in/GetMessageWithNonceUseCasePort";
import { LoginWalletDtoUseCasePort } from "@/application/ports/in/LoginWalletUseCasePort";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(
    private readonly loginWalletUseCase: LoginWalletDtoUseCasePort,
    private readonly getMessageWithNonceUseCase: GetMessageWithNonceUseCasePort
  ) {}

  async getMessageWithNonce(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: GetMessageWithNonceReqDto = req.body;

      const { message, nonce } = await this.getMessageWithNonceUseCase.execute(data);

      res.status(200).json({
        message,
        nonce,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginWalletDto = req.body;

      const result = await this.loginWalletUseCase.execute(data);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
