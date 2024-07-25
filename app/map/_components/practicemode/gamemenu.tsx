import { Game, GAMES } from "../../constants"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export const GameMenu: React.FC<{
  setCurrView: React.Dispatch<React.SetStateAction<"selectTerms" | "selectGames">>
  setSelectedGames: React.Dispatch<React.SetStateAction<Game[]>>
}> = ({ setCurrView, setSelectedGames }) => {
  const [selectedGames, setSelectedGame] = useState<number[]>([])

  const handleCheckboxChange = (index: number) => {
    setSelectedGame(prevState =>
      prevState.includes(index) ? prevState.filter(i => i !== index) : [...prevState, index]
    )
  }

  const handleSave = () => {
    setSelectedGames(selectedGames.map(index => GAMES[index]))
  }

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GAMES.map((game, index) => (
          <label
            key={index}
            className="flex items-center bg-green-300 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300">
            <input
              type="checkbox"
              checked={selectedGames.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{game}</span>
          </label>
        ))}
      </div>
      <button
        className="absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300"
        onClick={() => setCurrView("selectTerms")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={handleSave}
        className="absolute right-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300">
        Save
      </button>
    </div>
  )
}
