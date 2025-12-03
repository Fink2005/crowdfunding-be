import { SubmitQuizDto } from "@/application/dto/vocabulary/SubmitQuizDto";

export interface SubmitQuizPort {
  execute(input: SubmitQuizDto): Promise<{ score: number; total: number }>;
}
