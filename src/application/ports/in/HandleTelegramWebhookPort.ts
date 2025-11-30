import { TelegramWebhookDto } from "@/application/dto/TelegramWebhookDto";

export interface HandleTelegramWebhookPort {
  execute(webhook: TelegramWebhookDto): Promise<{ success: boolean; message?: string }>;
}
