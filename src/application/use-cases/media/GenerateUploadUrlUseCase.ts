import { GenerateUploadUrlDto } from "@/application/dto/GenerateUploadUrlDto";
import { GenerateUploadUrlPort } from "@/application/ports/in/media/GenerateUploadUrlPort";
import { ObjectStoragePort } from "@/application/ports/out/media/ObjectStoragePort";

export class GenerateUploadUrlUseCase implements GenerateUploadUrlPort {
  constructor(private storage: ObjectStoragePort) {}

  async execute(input: GenerateUploadUrlDto): Promise<{
    signedUrl: string;
  }> {
    const signedUrl = await this.storage.getSignedUrl(input.fileName, input.fileType);
    console.log("xin chao", signedUrl);
    return { signedUrl };
  }
}
