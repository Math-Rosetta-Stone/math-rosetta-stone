"use client"
import { GAMES } from "../../constants"
import { useState, useContext } from "react"
import { PracticeModalContext } from "../../../contexts/practicemodelproviders"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import "./transition.css"

export const GameMenu: React.FC<{
  setCurrView: React.Dispatch<React.SetStateAction<"selectTerms" | "selectGames">>
}> = ({ setCurrView }) => {
  const router = useRouter()

  const { gamesIndex, setGamesIndex, setGameMode } = useContext(PracticeModalContext)
  const [currSelectedGames, setCurrSelectedGame] = useState<number[]>(gamesIndex)
  const [screenShake, setScreenShake] = useState(false)

  const handleCheckboxChange = (index: number) => {
    setCurrSelectedGame(prevState => (prevState.includes(index) ? prevState.filter(i => i !== index) : [...prevState, index]))
  }

  const handleView = () => {
    setGamesIndex(currSelectedGames)
    setCurrView("selectTerms")
  }
  const handleSave = () => {
    if (currSelectedGames.length === 0) {
      setScreenShake(true)
      setTimeout(() => setScreenShake(false), 500)
      return
    }
    setGamesIndex(currSelectedGames)
    setGameMode("practice")
    router.push("/fib/practice")
  }

  return (
    <div className={cn("flex flex-col w-full h-full overflow-hidden", screenShake && "shake")}>
      <div className="grid grid-cols-1 sm:grid-cols-2 overflow-y-auto flex-grow">
        {GAMES.map((game, index) => (
          <label key={index} className="flex items-center bg-green-300 text-white font-bold m-5 rounded hover:bg-green-500 transition duration-300">
            <input
              type="checkbox"
              checked={currSelectedGames.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox ml-2 h-5 w-5 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{game}</span>
          </label>
        ))}
      </div>
      <button
        className={cn(
          "absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300",
          screenShake && "visibility: hidden"
        )}
        onClick={handleView}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={handleSave}
        className={cn(
          "absolute right-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300",
          screenShake && "visibility: hidden"
        )}>
        GO
      </button>
    </div>
  )
}
