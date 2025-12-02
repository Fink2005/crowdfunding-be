import { z } from "zod";

// Telegram webhook message structure
export const TelegramWebhookDtoSchema = z.object({
  message: z.object({
    text: z.string(),
    chat: z.object({
      id: z.number(),
    }),
  }),
});

export type TelegramWebhookDto = z.infer<typeof TelegramWebhookDtoSchema>;
