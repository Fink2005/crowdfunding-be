import { GenerateQuizPort } from "@/application/ports/in/GenerateQuizPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";

export class GenerateQuizUseCase implements GenerateQuizPort {
  constructor(private vocabularyRepository: VocabularyRepositoryPort) {}

  async execute(sourceLang: string, targetLang: string) {
    const words = await this.vocabularyRepository.findRandomByLanguagePair(
      sourceLang,
      targetLang,
      10
    );

    return words.map((word) => ({
      id: word._id,
      word: word.word,
      answer: word.meaning,
      choices: this.shuffleChoices(word.meaning, words),
    }));
  }

  shuffleChoices(correct: string, pool: any[]): string[] {
    const wrong = pool
      .filter((w) => w.meaning !== correct)
      .slice(0, 3)
      .map((w) => w.meaning);

    return this.shuffle([correct, ...wrong]);
  }

  shuffle(arr: string[]): string[] {
    return arr.sort(() => Math.random() - 0.5);
  }
}
