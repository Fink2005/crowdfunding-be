import { CreateVocabularyDto } from "@/application/dto/CreateVocabularyDto";
import { CreateVocabularyPort } from "@/application/ports/in/CreateVocabularyPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export class CreateVocabularyUseCase implements CreateVocabularyPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(input: CreateVocabularyDto): Promise<Vocabulary> {
    return this.vocabularyRepository.create(input);
  }
}
