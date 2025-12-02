import env from "@/infrastructure/config/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class R2ObjectStorageService {
  private client = new S3Client({
    region: "auto",
    endpoint: `https://${env.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.r2AccessKey,
      secretAccessKey: env.r2SecretKey,
    },
  });

  async getSignedUrl(fileName: string, fileType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: env.r2Bucket,
      Key: fileName,
      ContentType: fileType,
    });

    return getSignedUrl(this.client, command, { expiresIn: 60 });
  }
}
