export type MarkerType = "minigame" | "map"
export type Position = {x: number, y: number}
export type Marker = {
  type: MarkerType
  position: Position
}