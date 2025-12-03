import { GenerateContentDto } from "@/application/dto/ai/GenerateContentDto";

export interface GenerateContentPort {
  execute(input: GenerateContentDto): Promise<{ content: string }>;
}
