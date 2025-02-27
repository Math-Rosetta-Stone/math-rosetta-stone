export enum GameType {
  MATCHING = "matching",
  HANGMAN = "hangman",
  MCQ = "mcq",
  LOGO = "logo",
  FIB = "fib",
  LISTEN = "listen",
  MYSTERY = "mystery",
};

export type Level = {
  rank: number;
  game: GameType;
};