import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { CreateVocabularyPort } from "@/application/ports/in/vocabulary/CreateVocabularyPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export class CreateVocabularyUseCase implements CreateVocabularyPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(input: CreateVocabularyDto): Promise<Vocabulary> {
    return this.vocabularyRepository.create(input);
  }
}
