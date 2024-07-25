import React, { useState, useContext } from "react"
import { Game } from "../../constants"
import { TermMenu } from "./termmenu"
import { GameMenu } from "./gamemenu"
import { usePracticeModalContext } from "../../../contexts/practicemodelproviders"

const PracticeModal: React.FC = () => {
  const [currView, setCurrView] = useState<"selectTerms" | "selectGames">("selectTerms")

  const { currTermsIndex, setCurrTermsIndex, selectedGames, setSelectedGames } =
    usePracticeModalContext()

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {currView === "selectTerms" ? (
        <TermMenu setCurrTermsIndex={setCurrTermsIndex} setCurrView={setCurrView} />
      ) : (
        <GameMenu setCurrView={setCurrView} setSelectedGames={setSelectedGames} />
      )}
    </div>
  )
}

export default PracticeModal
