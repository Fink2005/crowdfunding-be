import { GenerateUploadUrlDto } from "@/application/dto/GenerateUploadUrlDto";

export interface GenerateUploadUrlPort {
  execute(input: GenerateUploadUrlDto): Promise<{ signedUrl: string }>;
}
