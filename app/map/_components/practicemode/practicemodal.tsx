// PracticeModal.tsx
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Game } from "../../constants"
import { setSelectedGames } from "../../../reduxlib/actions"
import { TermMenu } from "./termmenu"
import { GameMenu } from "./gamemenu"

const PracticeModal: React.FC = () => {
  const [currTermsIndex, setCurrTermsIndex] = useState<number[]>([])
  const [currView, setCurrView] = useState<"selectTerms" | "selectGames">("selectTerms")
  const [selectedGames, setSelectedGamesState] = useState<Game[]>([])
  const dispatch = useDispatch()

  const handleSave = (games: Game[]) => {
    setSelectedGamesState(games)
    dispatch(setSelectedGames(games))
  }

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {currView === "selectTerms" ? (
        <TermMenu setCurrTermsIndex={setCurrTermsIndex} setCurrView={setCurrView} />
      ) : (
        <GameMenu setCurrView={setCurrView} setSelectedGames={handleSave} />
      )}
    </div>
  )
}

export default PracticeModal
