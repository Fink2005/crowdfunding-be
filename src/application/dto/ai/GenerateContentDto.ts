import z from "zod";

export const GenerateContentDtoSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

export type GenerateContentDto = z.infer<typeof GenerateContentDtoSchema>;
