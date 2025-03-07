type RegularGame = {
  gameMode: "regular"
}
type PracticeGame = {
  gameMode: "practice"
  termsIndex: number[]
}
export type LayoutProps = RegularGame | PracticeGame
