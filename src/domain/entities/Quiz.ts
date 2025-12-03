export interface QuizQuestion {
  word: string;
  answer: string;
  choices: string[];
}

export interface QuizResult {
  address: string;
  score: number;
  total: number;
  createdAt?: Date;
}
