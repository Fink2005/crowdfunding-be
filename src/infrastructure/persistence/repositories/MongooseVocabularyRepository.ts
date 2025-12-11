import { CreateVocabularyDto } from "@/application/dto/vocabulary/CreateVocabularyDto";
import { VocabularyRepositoryPort } from "@/application/ports/out/vocabulary/VocabularyRepositoryPort";
import { Vocabulary } from "@/domain/entities/Vocabulary";
import { VocabularyModel } from "@/infrastructure/persistence/models/VocabularyModel";

export class MongooseVocabularyRepository implements VocabularyRepositoryPort {
  async create(data: CreateVocabularyDto): Promise<Vocabulary> {
    const vocabulary = await VocabularyModel.create(data);
    return vocabulary.toObject() as Vocabulary;
  }

  async findAll(): Promise<Vocabulary[]> {
    return VocabularyModel.find().lean();
  }

  async findById(id: string): Promise<Vocabulary | null> {
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

  async update(id: string, data: Partial<Vocabulary>): Promise<Vocabulary | null> {
    return VocabularyModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string): Promise<void> {
    await VocabularyModel.findByIdAndDelete(id);
  }

  async deleteMany(): Promise<void> {
    await VocabularyModel.deleteMany({});
  }

  async insertMany(vocabularies: Vocabulary[]): Promise<void> {
    await VocabularyModel.insertMany(vocabularies);
  }
}
