import { SaveQuizResultDto } from "@/application/dto/SaveQuizResultDto";
import { QuizRepositoryPort } from "@/application/ports/out/QuizRepositoryPort";
import { QuizResultModel } from "@/infrastructure/persistence/models/QuizResultModel";

export class MongooseQuizRepository implements QuizRepositoryPort {
  async saveResult(result: SaveQuizResultDto) {
    await QuizResultModel.create(result);
  }
}
