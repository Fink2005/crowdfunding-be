import { SaveChatIdPort } from "@/application/ports/in/telegram/SaveChatIdPort";
import { UserRepositoryPort } from "@/application/ports/out/user/UserRepositoryPort";

export class SaveChatIdUseCase implements SaveChatIdPort {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async execute(input: { address: string; chatId: string }) {
    await this.userRepo.updateChatId(input.address, input.chatId);
  }
}
