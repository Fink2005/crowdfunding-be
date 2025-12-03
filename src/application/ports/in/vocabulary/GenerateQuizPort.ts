export interface GenerateQuizPort {
  execute(
    sourceLang: string,
    targetLang: string
  ): Promise<
    Array<{
      word: string;
      answer: string;
      choices: string[];
    }>
  >;
}
