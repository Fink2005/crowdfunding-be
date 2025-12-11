import { GeminiServicePort } from "@/application/ports/out/ai/GeminiServicePort";
import env from "@/infrastructure/config/env";
import { GoogleGenAI } from "@google/genai";

export class GeminiService implements GeminiServicePort {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }

  async generateContent(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "";
  }
}
