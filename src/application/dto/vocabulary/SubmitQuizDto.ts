import z from "zod";

export const SubmitQuizDtoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  answers: z.array(
    z.object({
      wordId: z.string().min(1, "Word ID is required"),
      selected: z.string(),
    })
  ),
});

export type SubmitQuizDto = z.infer<typeof SubmitQuizDtoSchema>;
