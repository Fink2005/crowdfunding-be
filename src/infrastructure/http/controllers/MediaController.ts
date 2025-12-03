import { GenerateUploadUrlUseCase } from "@/application/use-cases/media/GenerateUploadUrlUseCase";
import { NextFunction, Request, Response } from "express";

export class MediaController {
  constructor(private generateUploadUrlUseCase: GenerateUploadUrlUseCase) {}

  async getSignedUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fileName, fileType } = req.query as { fileName: string; fileType: string };
      const signedUrl = await this.generateUploadUrlUseCase.execute({ fileName, fileType });
      res.json(signedUrl);
    } catch (error) {
      next(error);
    }
  }
}
