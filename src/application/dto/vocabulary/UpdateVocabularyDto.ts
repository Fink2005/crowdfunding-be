import z from "zod";

export const UpdateVocabularyDtoSchema = z.object({
  word: z.string().min(1).optional(),
  meaning: z.string().min(1).optional(),
  example: z.string().optional(),
  sourceLang: z.string().length(2).optional(),
  targetLang: z.string().length(2).optional(),
});

export type UpdateVocabularyDto = z.infer<typeof UpdateVocabularyDtoSchema>;
