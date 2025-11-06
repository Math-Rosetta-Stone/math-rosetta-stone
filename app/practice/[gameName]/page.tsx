"use client"

import Hangman from "@/app/game/hangman/game"
import McqGame from "@/app/game/mcq/game"
import FibGame from "@/app/game/fib/game"
import LogoGame from "@/app/game/logo/game"
import ListeningGame from "@/app/game/listen/game"
import MatchingGame from "@/app/game/matching/game"
import { Game } from "@/types/map"

export default function PracticeGame({ params }: { params: { gameName: Game } }): JSX.Element {
  switch (params.gameName) {
    case "hangman":
      return <Hangman />
    case "mcq":
      return <McqGame />
    case "fib":
      return <FibGame />
    case "logo":
      return <LogoGame />
    case "listen":
      return <ListeningGame />
    case "matching":
      return <MatchingGame />
    default:
      return <div>Invalid Game</div>
  }
}
