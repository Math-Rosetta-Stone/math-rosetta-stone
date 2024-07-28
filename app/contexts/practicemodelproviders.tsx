"use client"
import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react"

interface PracticeModalContextProps {
  termsIndex: number[]
  gamesIndex: number[]
  setTermsIndex: Dispatch<SetStateAction<number[]>>
  setGamesIndex: Dispatch<SetStateAction<number[]>>
  gameMode: "practice" | "regular"
  setGameMode: Dispatch<SetStateAction<"practice" | "regular">>
}

const PracticeModalContext = createContext<PracticeModalContextProps>({
  termsIndex: [],
  gamesIndex: [],
  gameMode: "regular",
  setTermsIndex: () => {},
  setGamesIndex: () => {},
  setGameMode: () => {},
})

const PracticeModalProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [termsIndex, setTermsIndex] = useState<number[]>([])
  const [gamesIndex, setGamesIndex] = useState<number[]>([])
  const [gameMode, setGameMode] = useState<"practice" | "regular">("regular")

  return (
    <PracticeModalContext.Provider
      value={{
        termsIndex,
        setTermsIndex,
        gamesIndex,
        setGamesIndex,
        gameMode,
        setGameMode,
      }}>
      {children}
    </PracticeModalContext.Provider>
  )
}

export { PracticeModalProvider, PracticeModalContext }
