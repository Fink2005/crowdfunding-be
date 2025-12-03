import { SaveQuizResultDto } from "@/application/dto/vocabulary/SaveQuizResultDto";
import { QuizRepositoryPort } from "@/application/ports/out/vocabulary/QuizRepositoryPort";
import { QuizResultModel } from "@/infrastructure/persistence/models/QuizResultModel";

export class MongooseQuizRepository implements QuizRepositoryPort {
  async saveResult(result: SaveQuizResultDto) {
    await QuizResultModel.create(result);
  }
}
