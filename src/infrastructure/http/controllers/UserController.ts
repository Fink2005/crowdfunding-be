import { GetUserByAddressUseCase } from "@/application/use-cases/user/GetUserByAddressUseCase";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private readonly getUserByAddressUseCase: GetUserByAddressUseCase) {}

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.query;

      if (!address || typeof address !== "string") {
        res.status(400).json({
          success: false,
          message: "Wallet address is required",
        });
        return;
      }

      const user = await this.getUserByAddressUseCase.execute(address);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
