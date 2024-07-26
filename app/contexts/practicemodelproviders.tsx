"use client"
import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react"
import { Game } from "../map/constants"

interface PracticeModalContextProps {
  TermsIndex: number[]
  selectedGames: Game[]
  setTermsIndex: Dispatch<SetStateAction<number[]>>
  setSelectedGames: Dispatch<SetStateAction<Game[]>>
}

const PracticeModalContext = createContext<PracticeModalContextProps>({
  TermsIndex: [],
  selectedGames: [],
  setTermsIndex: () => {},
  setSelectedGames: () => {},
})

const PracticeModalProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [TermsIndex, setTermsIndex] = useState<number[]>([])
  const [selectedGames, setSelectedGames] = useState<Game[]>([])

  return (
    <PracticeModalContext.Provider
      value={{
        TermsIndex,
        setTermsIndex,
        selectedGames,
        setSelectedGames,
      }}>
      {children}
    </PracticeModalContext.Provider>
  )
}

export { PracticeModalProvider, PracticeModalContext }
