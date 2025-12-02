import {
  GetMessageWithNonceReqDto,
  GetMessageWithNonceResDto,
} from "@/application/dto/GetMessageWithNonceDto";
import { GetMessageWithNonceUseCasePort } from "@/application/ports/in/GetMessageWithNonceUseCasePort";
import { CacheServicePort } from "@/application/ports/out/CacheServicePort";
import { createSignMessage } from "@/shared/crypto/sign-message";
import { randomBytes } from "crypto";

export class GetMessageWithNonceUseCase implements GetMessageWithNonceUseCasePort {
  constructor(private readonly cache: CacheServicePort) {}
  async execute(input: GetMessageWithNonceReqDto): Promise<GetMessageWithNonceResDto> {
    const addressLower = input.address.toLowerCase();
    const nonce = randomBytes(16).toString("hex");
    const message = createSignMessage(nonce, addressLower);
    await this.cache.setEx(`message:${addressLower}`, message, 60);
    return { message, nonce };
  }
}
