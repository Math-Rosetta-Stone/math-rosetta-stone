"use client"

import Hangman from "@/app/game/hangman/page"
import McqGame from "@/app/game/mcq/page"
import FibGame from "@/app/game/fib/page"
import LogoGame from "@/app/game/logo/page"
import ListeningGame from "@/app/game/listen/page"
import MatchingGame from "@/app/game/matching/page"
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
