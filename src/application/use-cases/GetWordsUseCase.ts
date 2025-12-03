import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";

export class GetWordsUseCase {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(sourceLang: string, targetLang: string) {
    return this.vocabularyRepository.findByLanguagePair(sourceLang, targetLang);
  }
}
