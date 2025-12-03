import { Vocabulary } from "@/domain/entities/Vocabulary";
import { Schema, model } from "mongoose";

const VocabularySchema = new Schema<Vocabulary>({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  sourceLang: { type: String, required: true },
  targetLang: { type: String, required: true },
  example: String,
});

export const VocabularyModel = model("Vocabulary", VocabularySchema);
