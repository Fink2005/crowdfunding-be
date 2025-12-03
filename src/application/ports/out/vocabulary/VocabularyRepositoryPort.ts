import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface VocabularyRepositoryPort {
  create(data: CreateVocabularyDto): Promise<Vocabulary>;
  findByLanguagePair(sourceLang: string, targetLang: string): Promise<Vocabulary[]>;
  findById(id: string): Promise<Vocabulary | null>;
  findRandomByLanguagePair(
    sourceLang: string,
    targetLang: string,
    limit: number
  ): Promise<Vocabulary[]>;
  deleteMany(ids: string[]): Promise<void>;
  insertMany(vocabularies: Vocabulary[]): Promise<void>;
}
