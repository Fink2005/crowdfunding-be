import { GetTelegramLinkPort } from "@/application/ports/in/GetTelegramLinkPort";
import env from "@/infrastructure/config/env";

export class GetTelegramLinkUseCase implements GetTelegramLinkPort {
  async execute(address: string): Promise<{ url: string }> {
    const botName = env.telegramBotName;

    const url = `https://t.me/${botName}?start=${address.toLowerCase()}`;

    return { url };
  }
}
