import { QuizResult } from "@/domain/entities/Quiz";
import { Schema, model } from "mongoose";

const QuizResultSchema = new Schema<QuizResult>({
  address: String,
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export const QuizResultModel = model("QuizResult", QuizResultSchema);
