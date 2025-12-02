import { TelegramWebhookDto } from "@/application/dto/TelegramWebhookDto";
import { HandleTelegramWebhookPort } from "@/application/ports/in/HandleTelegramWebhookPort";
import { SaveChatIdPort } from "@/application/ports/in/SaveChatIdPort";
import env from "@/infrastructure/config/env";
import axios from "axios";

export class HandleTelegramWebhookUseCase implements HandleTelegramWebhookPort {
  constructor(private readonly saveChatIdUseCase: SaveChatIdPort) {}

  async execute(webhook: TelegramWebhookDto): Promise<{ success: boolean }> {
    const { text, chat } = webhook.message;

    if (!text.startsWith("/start")) {
      return { success: true };
    }

    const address = text.replace("/start", "").trim().toLowerCase();

    if (!address.startsWith("0x") || address.length !== 42) {
      return { success: true };
    }

    const chatId = chat.id.toString();

    await this.saveChatIdUseCase.execute({ address, chatId });

    try {
      await axios.post(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
        chat_id: chatId,
        text: "🎉 Telegram connected! You will receive notifications for your campaigns.",
      });
    } catch (error) {
      console.error("Failed to send Telegram message:", error);
    }

    return { success: true };
  }
}
