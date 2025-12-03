import { CreateVocabularyDto } from "@/application/dto/CreateVocabularyDto";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface CreateVocabularyPort {
  execute(input: CreateVocabularyDto): Promise<Vocabulary>;
}
