export interface SubmitQuizPort {
  execute(input: {
    address: string;
    answers: { isCorrect: boolean }[];
  }): Promise<{ score: number; total: number }>;
}
