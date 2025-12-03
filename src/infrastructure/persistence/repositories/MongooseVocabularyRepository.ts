import { CreateVocabularyDto } from "@/application/dto/CreateVocabularyDto";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";
import { VocabularyModel } from "@/infrastructure/persistence/models/VocabularyModel";

export class MongooseVocabularyRepository implements VocabularyRepositoryPort {
  async deleteMany(): Promise<void> {
    await VocabularyModel.deleteMany({});
  }
  async insertMany(vocabularies: Vocabulary[]): Promise<void> {
    await VocabularyModel.insertMany(vocabularies);
  }
  async create(data: CreateVocabularyDto): Promise<Vocabulary> {
    const vocabulary = await VocabularyModel.create(data);
    return vocabulary.toObject();
  }

  findById(id: string): Promise<Vocabulary | null> {
    return VocabularyModel.findById(id).lean();
  }

  async findByLanguagePair(sourceLang: string, targetLang: string) {
    return VocabularyModel.find({ sourceLang, targetLang });
  }

  async findRandomByLanguagePair(sourceLang: string, targetLang: string, limit: number) {
    return VocabularyModel.aggregate([
      { $match: { sourceLang, targetLang } },
      { $sample: { size: limit } },
    ]);
  }
}
