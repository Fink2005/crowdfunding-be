export interface SendTelegramNotificationPort {
  execute(input: {
    address: string;
    message: string;
  }): Promise<{ success: boolean; message: string }>;
}
