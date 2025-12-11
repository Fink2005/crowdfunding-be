import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { SubmitQuizDto } from "@/application/dto/vocabulary/SubmitQuizDto";
import { UpdateVocabularyDto } from "@/application/dto/vocabulary/UpdateVocabularyDto";
import { CreateVocabularyUseCase } from "@/application/use-cases/vocabulary/CreateVocabularyUseCase";
import { DeleteVocabularyUseCase } from "@/application/use-cases/vocabulary/DeleteVocabularyUseCase";
import { GenerateQuizUseCase } from "@/application/use-cases/vocabulary/GenerateQuizUseCase";
import { GetAllVocabularyUseCase } from "@/application/use-cases/vocabulary/GetAllVocabularyUseCase";
import { GetWordsUseCase } from "@/application/use-cases/vocabulary/GetWordsUseCase";
import { SubmitQuizUseCase } from "@/application/use-cases/vocabulary/SubmitQuizUseCase";
import { UpdateVocabularyUseCase } from "@/application/use-cases/vocabulary/UpdateVocabularyUseCase";
import { NextFunction, Request, Response } from "express";

export class VocabularyController {
  constructor(
    private readonly createVocabularyUseCase: CreateVocabularyUseCase,
    private readonly getAllVocabularyUseCase: GetAllVocabularyUseCase,
    private readonly updateVocabularyUseCase: UpdateVocabularyUseCase,
    private readonly deleteVocabularyUseCase: DeleteVocabularyUseCase,
    private readonly getWordsUseCase: GetWordsUseCase,
    private readonly generateQuizUseCase: GenerateQuizUseCase,
    private readonly submitQuizUseCase: SubmitQuizUseCase
  ) {}

  async getWords(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sourceLang, targetLang } = req.query;

      if (!sourceLang || !targetLang) {
        res.status(400).json({
          success: false,
          message: "sourceLang and targetLang are required",
        });
        return;
      }

      const words = await this.getWordsUseCase.execute(sourceLang as string, targetLang as string);

      res.status(200).json({
        success: true,
        data: words,
      });
    } catch (error) {
      next(error);
    }
  }

  async generateQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sourceLang, targetLang } = req.query;

      if (!sourceLang || !targetLang) {
        res.status(400).json({
          success: false,
          message: "sourceLang and targetLang are required",
        });
        return;
      }

      const quiz = await this.generateQuizUseCase.execute(
        sourceLang as string,
        targetLang as string
      );

      res.status(200).json({
        success: true,
        data: quiz,
      });
    } catch (error) {
      next(error);
    }
  }

  async submitQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: SubmitQuizDto = req.body;

      const result = await this.submitQuizUseCase.execute(data);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createVocabulary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateVocabularyDto = req.body;

      const vocabulary = await this.createVocabularyUseCase.execute(data);

      res.status(201).json({
        success: true,
        message: "Vocabulary created successfully",
        data: vocabulary,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllVocabulary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vocabularies = await this.getAllVocabularyUseCase.execute();

      res.status(200).json({
        success: true,
        data: vocabularies,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVocabulary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateVocabularyDto = req.body;

      const vocabulary = await this.updateVocabularyUseCase.execute(id, data);

      if (!vocabulary) {
        res.status(404).json({
          success: false,
          message: "Vocabulary not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Vocabulary updated successfully",
        data: vocabulary,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteVocabulary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await this.deleteVocabularyUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: "Vocabulary deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
