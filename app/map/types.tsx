import { IntRange } from 'type-fest'; //for chapter

export type Chapter = IntRange<1, 7>
export type Land = "island"

export type MarkerType = "minigame" | "map"
export type Position = {x: number, y: number}
export type Marker = {
  type: MarkerType
  position: Position
//   chapter: number
}

export type GameMapManager = {
  markers: Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  updateMarkers: (index: number, position: Position) => void;
  currChapter: Chapter;
  setCurrChapter: React.Dispatch<React.SetStateAction<Chapter>>;
  currLand: Land;
  setCurrLand: React.Dispatch<React.SetStateAction<Land>>;
  selectedChapter: Chapter | null;
  setSelectedChapter: React.Dispatch<React.SetStateAction<Chapter | null>>;
  selectedLand: Land | null;
  setSelectedLand: React.Dispatch<React.SetStateAction<Land | null>>;
}