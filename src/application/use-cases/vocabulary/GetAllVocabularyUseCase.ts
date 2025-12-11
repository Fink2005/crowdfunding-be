import { GetAllVocabularyPort } from "@/application/ports/in/vocabulary/GetAllVocabularyPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export class GetAllVocabularyUseCase implements GetAllVocabularyPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(): Promise<Vocabulary[]> {
    return this.vocabularyRepository.findAll();
  }
}
