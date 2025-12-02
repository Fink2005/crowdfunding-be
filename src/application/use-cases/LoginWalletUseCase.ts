import { LoginWalletDto } from "@/application/dto/LoginWalletDto";
import { LoginWalletDtoUseCasePort } from "@/application/ports/in/LoginWalletUseCasePort";
import { VerifySignatureDtoUseCasePort } from "@/application/ports/in/VerifySignatureDtoUseCasePort";
import { UserRepositoryPort } from "@/application/ports/out/UserRepositoryPort";
import { InternalServerException, UnauthorizedException } from "@/domain/exceptions/BaseException";
import { isDuplicateKeyError } from "@/domain/exceptions/MongooseException";

export class LoginWalletUseCase implements LoginWalletDtoUseCasePort {
  constructor(
    private readonly verifySignatureCase: VerifySignatureDtoUseCasePort,
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(input: LoginWalletDto): Promise<{ success: boolean }> {
    const verified = await this.verifySignatureCase.execute(input);
    if (!verified.success) {
      throw new UnauthorizedException("Invalid signature");
    }

    const addressLower = input.address.toLowerCase();

    try {
      await this.userRepository.create({
        address: addressLower,
      });
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        return { success: true };
      }

      throw new InternalServerException();
    }

    return { success: true };
  }
}
