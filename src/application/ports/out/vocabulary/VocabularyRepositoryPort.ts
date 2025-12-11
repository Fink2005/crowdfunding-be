import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface VocabularyRepositoryPort {
  create(data: CreateVocabularyDto): Promise<Vocabulary>;
  findAll(): Promise<Vocabulary[]>;
  findByLanguagePair(sourceLang: string, targetLang: string): Promise<Vocabulary[]>;
  findById(id: string): Promise<Vocabulary | null>;
  findRandomByLanguagePair(
    sourceLang: string,
    targetLang: string,
    limit: number
  ): Promise<Vocabulary[]>;
  update(id: string, data: Partial<Vocabulary>): Promise<Vocabulary | null>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  insertMany(vocabularies: Vocabulary[]): Promise<void>;
}
