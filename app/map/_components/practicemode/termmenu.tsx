import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { mockDb, TermItem } from "../../constants"

type TermMenuProps = {
  setCurrTermsIndex: React.Dispatch<React.SetStateAction<number[]>>
  setCurrView: React.Dispatch<React.SetStateAction<"selectTerms" | "selectGames">>
}

export const TermMenu: React.FC<TermMenuProps> = ({ setCurrTermsIndex, setCurrView }) => {
  const [selectedTerms, setSelectedTerms] = useState<number[]>([])

  const handleCheckboxChange = (index: number) => {
    setSelectedTerms(prevState =>
      prevState.includes(index) ? prevState.filter(i => i !== index) : [...prevState, index]
    )
  }

  const handleView = () => {
    setCurrTermsIndex(selectedTerms)
    setCurrView("selectGames")
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockDb.map((termItem: TermItem, index: number) => (
          <label
            key={index}
            className="flex items-center bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300">
            <input
              type="checkbox"
              checked={selectedTerms.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{termItem.term}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleView}
        className="absolute right-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}
