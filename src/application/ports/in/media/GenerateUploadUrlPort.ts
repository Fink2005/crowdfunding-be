import { GenerateUploadUrlDto } from "@/application/dto/media/GenerateUploadUrlDto";

export interface GenerateUploadUrlPort {
  execute(input: GenerateUploadUrlDto): Promise<{
    signedUrl: string;
  }>;
}
