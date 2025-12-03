export interface GeminiServicePort {
  generateContent(prompt: string): Promise<string>;
}
