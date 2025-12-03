import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface GetWordsPort {
  execute(sourceLang: string, targetLang: string): Promise<Vocabulary[]>;
}
