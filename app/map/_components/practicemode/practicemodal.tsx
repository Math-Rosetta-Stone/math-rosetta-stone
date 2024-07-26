import React, { useState, useContext } from "react"
import { TermMenu } from "./termmenu"
import { GameMenu } from "./gamemenu"

const PracticeModal: React.FC = () => {
  const [currView, setCurrView] = useState<"selectTerms" | "selectGames">("selectTerms")

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {currView === "selectTerms" ? (
        <TermMenu setCurrView={setCurrView} />
      ) : (
        <GameMenu setCurrView={setCurrView} />
      )}
    </div>
  )
}

export default PracticeModal
