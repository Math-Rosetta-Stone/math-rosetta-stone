import { IntRange } from 'type-fest'; //for chapter

export type Chapter = IntRange<1, 7>
export type Land = "island" | "plain" | "interMap"

export type MarkerType = "minigame" | "map"
export type Position = {x: number, y: number}
export type Marker = MapMarker | MinigameMarker
export type MapMarker = {
  type: "map"
  position: Position
  targetLand: Land
  targetChapter: Chapter
}
export type MinigameMarker = {
  type: "minigame"
  position: Position
}

export type GameMapManager = {
  markers: Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  updateMarkers: (index: number, position: Position) => void;
  currChapter: Chapter;
  setCurrChapter: React.Dispatch<React.SetStateAction<Chapter>>;
  currLand: Land;
  setCurrLand: React.Dispatch<React.SetStateAction<Land>>;
}