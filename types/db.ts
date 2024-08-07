import { GameAndRandom } from "./map"

export type GamePosition = {
  level_no: number
  chapter_no: number
  branch_no: number
}

export type Level = {
  level_no: number
  chapter_no: number
  branch_no: number
  minigame_name: GameAndRandom
  x: number
  y: number
}
