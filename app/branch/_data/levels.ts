import { GameType, Level } from "./types";

const levels: Level[] = [
  {
    rank: 1,
    game: GameType.MATCHING,
  },
  {
    rank: 2,
    game: GameType.HANGMAN,
  },
  {
    rank: 3,
    game: GameType.MCQ,
  },
  {
    rank: 4,
    game: GameType.LOGO,
  },
  {
    rank: 5,
    game: GameType.FIB,
  },
  {
    rank: 6,
    game: GameType.LISTEN,
  },
  {
    rank: 7,
    game: GameType.MYSTERY,
  }
];

export default levels;
