import { SubmitQuizDto } from "@/application/dto/SubmitQuizDto";

export interface SubmitQuizPort {
  execute(input: SubmitQuizDto): Promise<{ score: number; total: number }>;
}
