import { VerifySignatureDto } from "@/application/dto/VerifySignatureDto";
import { VerifySignatureDtoUseCasePort } from "@/application/ports/in/VerifySignatureDtoUseCasePort";
import { CacheServicePort } from "@/application/ports/out/CacheServicePort";
import { UnauthorizedException } from "@/domain/exceptions/BaseException";
import { createSignMessage } from "@/shared/crypto/sign-message";
import { ethers } from "ethers";

export class VerifySignatureCase implements VerifySignatureDtoUseCasePort {
  constructor(private readonly cache: CacheServicePort) {}

  async execute(input: VerifySignatureDto): Promise<{ success: boolean }> {
    const { address, signature, nonce } = input;
    const addressLower = address.toLowerCase();

    const cachedNonce = await this.cache.get(`nonce:${addressLower}`);

    if (!cachedNonce || cachedNonce !== nonce) {
      throw new UnauthorizedException("Invalid nonce or expired");
    }

    const expectedMessage = createSignMessage(cachedNonce, addressLower);

    const recovered = ethers.verifyMessage(expectedMessage, signature);

    if (recovered.toLowerCase() !== addressLower) {
      throw new UnauthorizedException("Invalid signature");
    }

    await this.cache.delete(`nonce:${addressLower}`);

    return { success: true };
  }
}
