import { GenerateContentDto } from "@/application/dto/ai/GenerateContentDto";
import { GenerateContentPort } from "@/application/ports/in/ai/GenerateContentPort";
import { NextFunction, Request, Response } from "express";

export class AIController {
  constructor(private readonly generateContentUseCase: GenerateContentPort) {}

  async generateContent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: GenerateContentDto = req.body;
      const result = await this.generateContentUseCase.execute(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
