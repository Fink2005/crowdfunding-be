import { CreateCampaignMetadataUseCase } from "@/application/use-cases/CreateCampaignMetadataUseCase.js";
import { GetCampaignMetadataUseCase } from "@/application/use-cases/GetCampaignMetadataUseCase";
import { NextFunction, Request, Response } from "express";

export class CampaignController {
  constructor(
    private readonly createMetadataUseCase: CreateCampaignMetadataUseCase,
    private readonly getMetadataUseCase: GetCampaignMetadataUseCase
  ) {}

  async createMetadata(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.createMetadataUseCase.execute(req.body);

      res.status(201).json({
        result,
      });
    } catch (err: any) {
      console.error("[CampaignController] createMetadata error:", err);
      next(err);
    }
  }
  async getMetadata(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.getMetadataUseCase.execute({ page, limit });

      res.status(200).json({
        result,
      });
    } catch (err: any) {
      console.error("[CampaignController] getMetadata error:", err);
      next(err);
    }
  }
}
