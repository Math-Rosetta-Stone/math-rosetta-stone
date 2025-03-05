type LatLngBounds = [[number, number], [number, number]];
import { PersonStanding, ClipboardList, Type } from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { FaEarListen } from "react-icons/fa6";
import { TbMathFunction } from "react-icons/tb";

export type Games = {
  hangman: "hangman";
  mcq: "mcq";
  matching: "matching";
  logo: "logo";
  fib: "fib";
  listen: "listen";
};

export type Game = keyof Games;

export const GAMES: ReadonlyArray<Game> = [
  "hangman",
  "mcq",
  "matching",
  "logo",
  "fib",
  "listen",
];

export type GamesWithRandom = Game | "random";
export const GAMES_WITH_RANDOM: ReadonlyArray<GamesWithRandom> = [
  ...GAMES,
  "random",
];

export const BRANCH_ICON_PATHS: Record<number, string> = {
  0: "/svg/icon/gitBranch.svg",
  1: "/svg/icon/gitBranch.svg",
  2: "/svg/icon/gitBranch.svg",
  3: "/svg/icon/gitBranch.svg",
  4: "/svg/icon/gitBranch.svg",
  5: "/svg/icon/gitBranch.svg",
  6: "/svg/icon/gitBranch.svg",
  7: "/svg/icon/gitBranch.svg",
};

export const GAME_ICONS_PATHS: Record<GamesWithRandom, string> = {
  hangman: "/svg/icon/personStanding.svg",
  mcq: "/svg/icon/clipboardList.svg",
  matching: "/svg/icon/manageSearch.svg",
  logo: "/svg/icon/addPhotoAlternate.svg",
  fib: "/svg/icon/type.svg",
  listen: "/svg/icon/ear.svg",
  random: "/svg/icon/question.svg",
};

export const MAP_BOUNDS: LatLngBounds = [
  [0, 0],
  [1000, 1000],
]; // Define bounds according to your image dimensions

type LandMapsPaths = {
  [key: string]: string;
};

export const LAND_MAPS_PATHS: LandMapsPaths = {
  Island: "map.png",
  InterMap: "intermap.png",
  Plain: "map1.png",
  Land1: "land/land1.png",
  Land2: "land/land2.png",
  Land3: "land/land3.png",
  Land4: "land/land4.png",
};

type BranchMapsPaths = {
  [key: number]: string;
};

export const BRANCH_MAPS_PATHS: BranchMapsPaths = [
  "intermap.png",
  "map.png",
  "map1.png",
  "land/land1.png",
  "land/land2.png",
  "land/land3.png",
  "land/land4.png",
  "untitled.png",
];

export const Land_to_branch_no = {
  Island: 1,
  InterMap: 2,
  Plain: 3,
  Land1: 4,
  Land2: 5,
  Land3: 6,
  Land4: 7,
};

type Image = {
  title: string;
  url: string;
};

export type TermItem = {
  term: string;
  definition: string;
  image: Image;
  example: string;
};

export const MOCK_DB: TermItem[] = [
  {
    term: "derivative",
    definition: "rate of change",
    image: {
      title: "Derivative",
      url: "/derivative.jpg",
    },
    example: "The derivative of f(x)=x^2 is f'(x) = 2x.",
  },
  // {
  //   term: "integral",
  //   definition: "area under the curve",
  //   image: {
  //     title: "Integral",
  //     url: "/integral.jpg",
  //   },
  //   example: "Integral is the area under the curve.",
  // },
  // {
  //   term: "limit",
  //   definition: "approaching a value",
  //   image: {
  //     title: "Limit",
  //     url: "/limit.png",
  //   },
  //   example: "The value a function gets close to but might not reach.",
  // },
  // {
  //   term: "function",
  //   definition: "relation between inputs and outputs",
  //   image: {
  //     title: "Function",
  //     url: "/function.jpg",
  //   },
  //   example: "The identity function outputs the input",
  // },
  // {
  //   term: "slope",
  //   definition: "steepness of a line",
  //   image: {
  //     title: "Slope",
  //     url: "/slope.jpg",
  //   },
  //   example: "The slope of the line y = 2x is 2.",
  // },
  // {
  //   term: "tangent",
  //   definition: "line that touches a curve",
  //   image: {
  //     title: "Tangent",
  //     url: "/tangent.png",
  //   },
  //   example: "The tangent line to the function f(x)=x^2 at x=1 is the line y=2x-1.",
  // },
];
