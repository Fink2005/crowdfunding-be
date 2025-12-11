import { DeleteVocabularyPort } from "@/application/ports/in/vocabulary/DeleteVocabularyPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";

export class DeleteVocabularyUseCase implements DeleteVocabularyPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const vocabulary = await this.vocabularyRepository.findById(id);
    if (!vocabulary) {
      throw new Error("Vocabulary not found");
    }
    await this.vocabularyRepository.delete(id);
  }
}
