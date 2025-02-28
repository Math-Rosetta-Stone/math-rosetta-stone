import { GameType, Level } from "./types";

const levels: Level[] = [
  {
    rank: 1,
    game: GameType.MATCHING,
    position: {
      x: 10,
      y: 10,
    },
  },
  {
    rank: 2,
    game: GameType.HANGMAN,
    position: {
      x: 150,
      y: 100,
    },
  },
  {
    rank: 3,
    game: GameType.MCQ,
    position: {
      x: 300,
      y: 200,
    },
  },
  {
    rank: 4,
    game: GameType.LOGO,
    position: {
      x: 450,
      y: 150,
    },
  },
  {
    rank: 5,
    game: GameType.FIB,
    position: {
      x: 600,
      y: 250,
    },
  },
  {
    rank: 6,
    game: GameType.LISTEN,
    position: {
      x: 750,
      y: 200,
    },
  },
  {
    rank: 7,
    game: GameType.MYSTERY,
    position: {
      x: 890,
      y: 350,
    },
  },
];

export default levels;
