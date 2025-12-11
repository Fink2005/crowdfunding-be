import { TelegramWebhookDto } from "@/application/dto/telegram/TelegramWebhookDto";

export interface HandleTelegramWebhookPort {
  execute(webhook: TelegramWebhookDto): Promise<{ success: boolean; message?: string }>;
}
