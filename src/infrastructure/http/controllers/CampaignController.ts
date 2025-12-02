import { CreateCampaignMetadataUseCase } from "@/application/use-cases/CreateCampaignMetadataUseCase.js";
import { GetCampaignMetadataByIdUseCase } from "@/application/use-cases/GetCampaignMetadataByIdUseCase";
import { GetCampaignMetadataUseCase } from "@/application/use-cases/GetCampaignMetadataUseCase";
import { NextFunction, Request, Response } from "express";

export class CampaignController {
  constructor(
    private readonly createMetadataUseCase: CreateCampaignMetadataUseCase,
    private readonly getMetadataUseCase: GetCampaignMetadataUseCase,
    private readonly getMetadataByIdUseCase: GetCampaignMetadataByIdUseCase
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

      const {campaigns, currentPage,totalPages} = await this.getMetadataUseCase.execute({ page, limit });

      res.status(200).json({
        campaigns,
        currentPage,
        totalPages,
      });
    } catch (err: any) {
      console.error("[CampaignController] getMetadata error:", err);
      next(err);
    }
  }

  async getMetadataById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getMetadataByIdUseCase.execute({ id });

      if (!result) {
        res.status(404).json({
          success: false,
          message: "Campaign not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Campaign retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      console.error("[CampaignController] getMetadataById error:", err);
      next(err);
    }
  }
}
