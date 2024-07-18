type LatLngBounds = [[number, number], [number, number]];

export const MAP_BOUNDS: LatLngBounds = [
    [0, 0],
    [1000, 1000],
]; // Define bounds according to your image dimensions

type LandMapsPaths = {
    [key: string]: string
}

export const LAND_MAPS_PATHS: LandMapsPaths = {
    "island": "map.png",
    "interMap": "intermap.png",
    "plain": "map1.png"
}