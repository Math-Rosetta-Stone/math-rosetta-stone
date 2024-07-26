"use client"
import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react"

interface PracticeModalContextProps {
  TermsIndex: number[]
  GamesIndex: number[]
  setTermsIndex: Dispatch<SetStateAction<number[]>>
  setGamesIndex: Dispatch<SetStateAction<number[]>>
}

const PracticeModalContext = createContext<PracticeModalContextProps>({
  TermsIndex: [],
  GamesIndex: [],
  setTermsIndex: () => {},
  setGamesIndex: () => {},
})

const PracticeModalProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [TermsIndex, setTermsIndex] = useState<number[]>([])
  const [GamesIndex, setGamesIndex] = useState<number[]>([])

  return (
    <PracticeModalContext.Provider
      value={{
        TermsIndex,
        setTermsIndex,
        GamesIndex,
        setGamesIndex,
      }}>
      {children}
    </PracticeModalContext.Provider>
  )
}

export { PracticeModalProvider, PracticeModalContext }
