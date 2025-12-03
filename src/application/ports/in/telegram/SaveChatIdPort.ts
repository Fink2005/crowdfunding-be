export interface SaveChatIdPort {
  execute(input: { address: string; chatId: string }): Promise<void>;
}
