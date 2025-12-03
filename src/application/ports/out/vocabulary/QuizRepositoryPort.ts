import { SaveQuizResultDto } from "@/application/dto/vocabulary/SaveQuizResultDto";

export interface QuizRepositoryPort {
  saveResult(result: SaveQuizResultDto): Promise<void>;
}
