import { TermItem } from "@/types/mcq";
type LatLngBounds = [[number, number], [number, number]];

export const MAP_BOUNDS: LatLngBounds = [
    [0, 0],
    [1000, 1000],
]; // Define bounds according to your image dimensions

type LandMapsPaths = {
    [key: string]: string
}

export const LAND_MAPS_PATHS: LandMapsPaths = {
    "Island": "map.png",
    "InterMap": "intermap.png",
    "Plain": "map1.png"
}

const mockDb: TermItem[] = [
    {
      term: "derivative",
      definition: "rate of change",
      image: {
        title: "Derivative",
        url: "/derivative.jpg",
      },
    },
    {
      term: "integral",
      definition: "area under the curve",
      image: {
        title: "Integral",
        url: "/integral.jpg",
      },
    },
    {
      term: "limit",
      definition: "approaching a value",
      image: {
        title: "Limit",
        url: "/limit.png",
      },
    },
    {
      term: "function",
      definition: "relation between inputs and outputs",
      image: {
        title: "Function",
        url: "/function.jpg",
      },
    },
    {
      term: "slope",
      definition: "steepness of a line",
      image: {
        title: "Slope",
        url: "/slope.jpg",
      },
    },
    {
      term: "tangent",
      definition: "line that touches a curve",
      image: {
        title: "Tangent",
        url: "/tangent.png",
      },
    },
  ];