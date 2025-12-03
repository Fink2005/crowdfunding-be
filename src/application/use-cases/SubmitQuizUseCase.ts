import { SubmitQuizDto } from "@/application/dto/SubmitQuizDto";
import { QuizRepositoryPort } from "@/application/ports/out/QuizRepositoryPort";
import { VocabularyRepositoryPort } from "@/application/ports/out/VocabularyRepositoryPort";

export class SubmitQuizUseCase {
  constructor(
    private quizRepository: QuizRepositoryPort,
    private vocabularyRepositoryPort: VocabularyRepositoryPort
  ) {}

  async execute(input: SubmitQuizDto) {
    const { address, answers } = input;
    let score = 0;
    const total = answers.length;

    for (const a of answers) {
      const word = await this.vocabularyRepositoryPort.findById(a.wordId);

      if (!word) continue;

      const isCorrect = word.meaning === a.selected;

      if (isCorrect) score++;
    }

    await this.quizRepository.saveResult({
      address,
      score,
      total,
    });

    return { score, total };
  }
}
