import { CreateVocabularyDto } from "@/application/dto/CreateVocabularyDto";
import { SubmitQuizDto } from "@/application/dto/SubmitQuizDto";
import { CreateVocabularyUseCase } from "@/application/use-cases/CreateVocabularyUseCase";
import { GenerateQuizUseCase } from "@/application/use-cases/GenerateQuizUseCase";
import { GetWordsUseCase } from "@/application/use-cases/GetWordsUseCase";
import { SubmitQuizUseCase } from "@/application/use-cases/SubmitQuizUseCase";
import { NextFunction, Request, Response } from "express";

export class VocabularyController {
  constructor(
    private readonly createVocabularyUseCase: CreateVocabularyUseCase,
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
}
