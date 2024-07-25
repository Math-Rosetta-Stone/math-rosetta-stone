import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react"
import { Game } from "../map/constants"

interface PracticeModalContextProps {
  currTermsIndex: number[]
  selectedGames: Game[]
  setCurrTermsIndex: Dispatch<SetStateAction<number[]>>
  setSelectedGames: Dispatch<SetStateAction<Game[]>>
}

const PracticeModalContext = createContext<PracticeModalContextProps | undefined>(undefined)

interface PracticeModalProviderProps {
  children: ReactNode
}

const PracticeModalProvider = ({ children }: PracticeModalProviderProps) => {
  const [currTermsIndex, setCurrTermsIndex] = useState<number[]>([])
  const [selectedGames, setSelectedGames] = useState<Game[]>([])

  return (
    <PracticeModalContext.Provider
      value={{
        currTermsIndex,
        setCurrTermsIndex,
        selectedGames,
        setSelectedGames,
      }}>
      {children}
    </PracticeModalContext.Provider>
  )
}

export { PracticeModalProvider, PracticeModalContext }

export function usePracticeModalContext() {
  const context = useContext(PracticeModalContext)
  if (context === undefined) {
    throw new Error("usePracticeModalContext must be used within a PracticeModalProvider")
  }
  return context
}
