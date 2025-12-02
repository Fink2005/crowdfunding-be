import { SaveChatIdPort } from "@/application/ports/in/SaveChatIdPort";
import { UserRepositoryPort } from "@/application/ports/out/UserRepositoryPort";
import { ConflictException } from "@/domain/exceptions/BaseException";

export class SaveChatIdUseCase implements SaveChatIdPort {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(input: { address: string; chatId: string }) {
    const user = await this.userRepo.findByAddress(input.address);
    if (!user) {
      throw new ConflictException("User not found");
    }
    await this.userRepo.updateChatId(input.address, input.chatId);
  }
}
