export enum GameType {
  MATCHING = "matching",
  HANGMAN = "hangman",
  MCQ = "mcq",
  LOGO = "logo",
  FIB = "fib",
  LISTEN = "listen",
  MYSTERY = "mystery",
};

export type Point = {
  x: number;
  y: number;
};

export type Level = {
  rank: number;
  game: GameType;
  position: Point;
};