export interface GetTelegramLinkPort {
  execute(address: string): Promise<{ url: string }>;
}
