import { LoginWalletDto } from "@/application/dto/LoginWalletDto";

export interface LoginWalletDtoUseCasePort {
  execute(input: LoginWalletDto): Promise<{ success: boolean }>;
}
