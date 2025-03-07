// PopoutForm.tsx
import React, { useState } from "react"
import { Land, Chapter } from "@/types/map"

interface PopoutFormProps {
  onSubmit: (targetLand: Land, targetChapter: Chapter) => void
  onClose: () => void
}

const PopoutFormMap: React.FC<PopoutFormProps> = ({ onSubmit, onClose }) => {
  const [targetLand, setTargetLand] = useState<Land>("Island")
  const [targetChapter, setTargetChapter] = useState<Chapter>(1)

  const handleSubmit = () => {
    onSubmit(targetLand, targetChapter)
    onClose()
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Add Map Marker</h2>
      <div className="mb-4">
        <label className="block mb-2">Target Land</label>
        <select value={targetLand} onChange={e => setTargetLand(e.target.value as Land)} className="p-2 border rounded w-full">
          <option value="Island">Island</option>
          <option value="Plain">Plain</option>
          <option value="InterMap">Inter Map</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Target Chapter</label>
        <input
          type="number"
          value={targetChapter}
          onChange={e => setTargetChapter(Number(e.target.value) as Chapter)}
          min="1"
          max="6"
          className="p-2 border rounded w-full"
        />
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

export default PopoutFormMap
