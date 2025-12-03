import { GetWordsPort } from "@/application/ports/in/vocabulary/GetWordsPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";

export class GetWordsUseCase implements GetWordsPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(sourceLang: string, targetLang: string) {
    return this.vocabularyRepository.findByLanguagePair(sourceLang, targetLang);
  }
}
