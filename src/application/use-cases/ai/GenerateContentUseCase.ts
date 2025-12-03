import { GenerateContentDto } from "@/application/dto/ai/GenerateContentDto";
import { GenerateContentPort } from "@/application/ports/in/ai/GenerateContentPort";
import { GeminiServicePort } from "@/application/ports/out/ai/GeminiServicePort";

export class GenerateContentUseCase implements GenerateContentPort {
  constructor(private geminiService: GeminiServicePort) {}

  async execute(input: GenerateContentDto): Promise<{ content: string }> {
    const content = await this.geminiService.generateContent(input.prompt);
    return { content };
  }
}
