import { SaveQuizResultDto } from "@/application/dto/SaveQuizResultDto";

export interface QuizRepositoryPort {
  saveResult(result: SaveQuizResultDto): Promise<void>;
}
