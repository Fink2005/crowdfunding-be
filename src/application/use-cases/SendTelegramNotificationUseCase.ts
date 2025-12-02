import { SendTelegramNotificationPort } from "@/application/ports/in/SendTelegramNotificationPort";
import { UserRepositoryPort } from "@/application/ports/out/UserRepositoryPort";
import env from "@/infrastructure/config/env";
import axios from "axios";

export class SendTelegramNotificationUseCase implements SendTelegramNotificationPort {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(input: {
    address: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const { address, message } = input;

    // Get user to get chatId
    const user = await this.userRepository.findByAddress(address.toLocaleLowerCase());
    if (!user || !user.chatId) {
      return { success: false, message: "User not found or Telegram not connected" };
    }

    // Send Telegram notification
    try {
      await axios.post(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
        chat_id: user.chatId,
        text: message,
        parse_mode: "HTML",
      });

      return { success: true, message: "Notification sent successfully" };
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
      return { success: false, message: "Failed to send notification" };
    }
  }
}
