type LatLngBounds = [[number, number], [number, number]]
export type Game = "hangman" | "mcq" | "matching" | "logo"

export const GAMES: Game[] = ["hangman", "mcq", "matching", "logo"]

export const MAP_BOUNDS: LatLngBounds = [
  [0, 0],
  [1000, 1000],
] // Define bounds according to your image dimensions

type LandMapsPaths = {
  [key: string]: string
}

export const LAND_MAPS_PATHS: LandMapsPaths = {
  Island: "map.png",
  InterMap: "intermap.png",
  Plain: "map1.png",
}

type Image = {
  title: string
  url: string
}

export type TermItem = {
  term: string
  definition: string
  image: Image
  example: string
}

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
  {
    term: "integral",
    definition: "area under the curve",
    image: {
      title: "Integral",
      url: "/integral.jpg",
    },
    example: "Integral is the area under the curve.",
  },
  {
    term: "limit",
    definition: "approaching a value",
    image: {
      title: "Limit",
      url: "/limit.png",
    },
    example: "The value a function gets close to but might not reach.",
  },
  {
    term: "function",
    definition: "relation between inputs and outputs",
    image: {
      title: "Function",
      url: "/function.jpg",
    },
    example: "The identity function outputs the input",
  },
  {
    term: "slope",
    definition: "steepness of a line",
    image: {
      title: "Slope",
      url: "/slope.jpg",
    },
    example: "The slope of the line y = 2x is 2.",
  },
  {
    term: "tangent",
    definition: "line that touches a curve",
    image: {
      title: "Tangent",
      url: "/tangent.png",
    },
    example: "The tangent line to the function f(x)=x^2 at x=1 is the line y=2x-1.",
  },
]
