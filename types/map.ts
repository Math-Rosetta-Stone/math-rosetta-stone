import { IntRange } from "type-fest"; //for chapter

export type Game = "hangman" | "mcq" | "matching" | "logo" | "fib" | "listen";
export type GameAndRandom = Game | "random";
export type Chapter = IntRange<1, 7>;
export type Land =
  | "Island"
  | "Plain"
  | "InterMap"
  | "Land1"
  | "Land2"
  | "Land3"
  | "Land4";

export type GamePosition = {
  branch_no: number;
  chapter_no: number;
  level_no: number;
};
