import z from "zod";

export const CreateVocabularyDtoSchema = z.object({
  word: z.string().min(1, "Word is required"),
  meaning: z.string().min(1, "Meaning is required"),
  sourceLang: z.string().min(2, "Source language must be at least 2 characters").max(10),
  targetLang: z.string().min(2, "Target language must be at least 2 characters").max(10),
  example: z.string().optional(),
});

export type CreateVocabularyDto = z.infer<typeof CreateVocabularyDtoSchema>;
