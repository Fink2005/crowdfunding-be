import { VerifySignatureDto } from "@/application/dto/VerifySignatureDto";

export interface VerifySignatureDtoUseCasePort {
  execute(input: VerifySignatureDto): Promise<{ success: boolean }>;
}
