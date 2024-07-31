"use client"

import Hangman from "@/app/hangman/page"
import McqGame from "@/app/mcq/page"
import FibGame from "@/app/fib/page"
import LogoGame from "@/app/logo/page"
import ListeningGame from "@/app/listen/page"
import MatchingGame from "@/app/matching/page"
import { Game } from "@/app/map/constants"

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
