import z from "zod";

export const SaveQuizResultDtoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  score: z.number().min(0, "Score must be at least 0"),
  total: z.number().min(1, "Total must be at least 1"),
});

export type SaveQuizResultDto = z.infer<typeof SaveQuizResultDtoSchema>;
