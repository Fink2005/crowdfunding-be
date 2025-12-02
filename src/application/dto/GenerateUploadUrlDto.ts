import z from "zod";

export const GenerateUploadUrlDtoSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  fileType: z.string().min(1, "File type is required"),
});

export type GenerateUploadUrlDto = z.infer<typeof GenerateUploadUrlDtoSchema>;
