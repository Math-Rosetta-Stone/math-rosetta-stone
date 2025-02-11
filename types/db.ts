import { GameAndRandom } from "./map"

export type GamePosition = {
  branch_no: number
  chapter_no: number
  level_no: number
}

export type Level = {
  level_no: number
  chapter_no: number
  branch_no: number
  minigame_name: GameAndRandom
  x: number
  y: number
}
