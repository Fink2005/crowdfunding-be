import { CreateVocabularyDto } from "@/application/dto/CreateVocabularyDto";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export class CreateVocabularyUseCase {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(input: CreateVocabularyDto): Promise<Vocabulary> {
    return this.vocabularyRepository.create(input);
  }
}
