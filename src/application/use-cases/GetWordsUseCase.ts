import { GetWordsPort } from "@/application/ports/in/GetWordsPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";

export class GetWordsUseCase implements GetWordsPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(sourceLang: string, targetLang: string) {
    return this.vocabularyRepository.findByLanguagePair(sourceLang, targetLang);
  }
}
