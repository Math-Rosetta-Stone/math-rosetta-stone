// PopoutForm.tsx
import React, { useState } from "react"
import { GameAndRandom } from "@/types/map"

interface PopoutFormProps {
  onSubmit: (targetGame: GameAndRandom) => void
  onClose: () => void
}

const PopoutFormMini: React.FC<PopoutFormProps> = ({ onSubmit, onClose }) => {
  const [targetGame, setTargetGame] = useState<GameAndRandom>("random")

  const handleSubmit = () => {
    onSubmit(targetGame)
    onClose()
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Add Map Marker</h2>
      <div className="mb-4">
        <label className="block mb-2">Target Land</label>
        <select value={targetGame} onChange={e => setTargetGame(e.target.value as GameAndRandom)} className="p-2 border rounded w-full">
          <option value="hangman">Hangman</option>
          <option value="fib">Fib</option>
          <option value="listen">Listen</option>
          <option value="random">Random Game</option>
          <option value="mcq">MCQ</option>
          <option value="logo">Logo</option>
          <option value="matching">Matching</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button onClick={onClose} className="mr-2 p-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </div>
    </div>
  )
}

export default PopoutFormMini
