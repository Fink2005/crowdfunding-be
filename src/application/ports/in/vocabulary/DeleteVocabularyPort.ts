export interface DeleteVocabularyPort {
  execute(id: string): Promise<void>;
}
