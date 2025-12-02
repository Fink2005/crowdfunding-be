import { GenerateUploadUrlDto } from "@/application/dto/GenerateUploadUrlDto";
import { ObjectStoragePort } from "@/application/ports/out/ObjectStoragePort";

export class GenerateUploadUrlUseCase {
  constructor(private storage: ObjectStoragePort) {}

  async execute(input: GenerateUploadUrlDto) {
    return await this.storage.getSignedUrl(input.fileName, input.fileType);
  }
}
