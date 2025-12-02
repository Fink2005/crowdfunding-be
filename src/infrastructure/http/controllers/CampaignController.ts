import { CreateCampaignMetadataDto } from "@/application/dto/CreateCampaignMetadataDto.js";
import { CreateCampaignMetadataUseCase } from "@/application/use-cases/CreateCampaignMetadataUseCase.js";
import { NextFunction, Request, Response } from "express";

export class CampaignController {
  constructor(private readonly createMetadataUseCase: CreateCampaignMetadataUseCase) {}

  async createMetadata(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, creator, imageUrl } = req.body;

      const dto: CreateCampaignMetadataDto = {
        title,
        description,
        creator,
        ...(imageUrl && { imageUrl }),
      };

      const result = await this.createMetadataUseCase.execute(dto);

      res.status(201).json({
        result,
      });
    } catch (err: any) {
      console.error("[CampaignController] createMetadata error:", err);
      next(err);
    }
  }
}
