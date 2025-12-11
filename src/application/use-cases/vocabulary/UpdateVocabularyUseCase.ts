import { UpdateVocabularyDto } from "@/application/dto/vocabulary/UpdateVocabularyDto";
import { UpdateVocabularyPort } from "@/application/ports/in/vocabulary/UpdateVocabularyPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export class UpdateVocabularyUseCase implements UpdateVocabularyPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(id: string, input: UpdateVocabularyDto): Promise<Vocabulary | null> {
    return this.vocabularyRepository.update(id, input);
  }
}
