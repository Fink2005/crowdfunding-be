import { GenerateUploadUrlDto } from "@/application/dto/GenerateUploadUrlDto";
import { GenerateUploadUrlPort } from "@/application/ports/in/GenerateUploadUrlPort";
import { ObjectStoragePort } from "@/application/ports/out/ObjectStoragePort";

export class GenerateUploadUrlUseCase implements GenerateUploadUrlPort {
  constructor(private storage: ObjectStoragePort) {}

  async execute(input: GenerateUploadUrlDto): Promise<{ signedUrl: string }> {
    const signedUrl = await this.storage.getSignedUrl(input.fileName, input.fileType);
    return { signedUrl };
  }
}
