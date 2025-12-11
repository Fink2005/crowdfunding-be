import { UpdateVocabularyDto } from "@/application/dto/vocabulary/UpdateVocabularyDto";
import { Vocabulary } from "@/domain/entities/Vocabulary";

export interface UpdateVocabularyPort {
  execute(id: string, input: UpdateVocabularyDto): Promise<Vocabulary | null>;
}
