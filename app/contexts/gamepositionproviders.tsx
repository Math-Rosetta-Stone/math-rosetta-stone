"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { GamePosition } from "@/types/db"

interface GamePositionContextProps {
  gamePosition: GamePosition | null
  setGamePosition: Dispatch<SetStateAction<GamePosition | null>>
}

// Provide a no-op default function for setGamePosition to avoid errors
const GamePositionContext = createContext<GamePositionContextProps>({
  gamePosition: null,
  setGamePosition: () => {},
})

const GamePositionProvider = ({ children }: { children: ReactNode }) => {
  const [gamePosition, setGamePosition] = useState<GamePosition | null>(null)

  return (
    <GamePositionContext.Provider
      value={{
        gamePosition,
        setGamePosition,
      }}>
      {children}
    </GamePositionContext.Provider>
  )
}

export { GamePositionProvider, GamePositionContext }
