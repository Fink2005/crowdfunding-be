import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface GetAllVocabularyPort {
  execute(): Promise<Vocabulary[]>;
}
