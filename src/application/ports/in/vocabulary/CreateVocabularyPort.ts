import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface CreateVocabularyPort {
  execute(input: CreateVocabularyDto): Promise<Vocabulary>;
}
