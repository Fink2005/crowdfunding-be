export interface Vocabulary {
  _id: string;
  word: string;
  meaning: string;
  sourceLang: string;
  targetLang: string;
  example?: string;
}
