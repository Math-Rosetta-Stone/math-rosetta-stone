import React from 'react';

import { useState } from 'react';
import { mockDb, TermItem } from "../constants"

const Dictionary: React.FC = () => {
  const [currTermItem, setCurrTermItem] = useState<TermItem | null>(null);

  return (
    <div className="w-full h-full bg-amber-100 p-4 overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        {mockDb.map((termItem: TermItem, index: React.Key | null | undefined) => (
          <button
            key={index}
            className="bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300"
            onClick={() => setCurrTermItem(termItem)}
          >
            {termItem.term}
          </button>
        ))}
      </div>
      { currTermItem && <DictItem termItem = {currTermItem}/> }
    </div>
  );
};

const DictItem: React.FC<{ termItem: TermItem }> = ({ termItem }) => {
  return (
    <div className="mt-6 p-6 bg-yellow-200 rounded-lg shadow-lg">
      <h3 className="font-mono font-bold text-gray-800 text-2xl mb-2">{termItem.term}</h3>
      <p className="text-gray-600 mb-4"><span className="font-semibold">Definition:</span> {termItem.definition}</p>
      <p className="text-gray-600 mb-4"><span className="font-semibold">Example:</span> {termItem.example}</p>
      <img src={termItem.image.url} alt={termItem.term} className="max-w-xs mx-auto h-auto rounded-lg shadow-md" />
    </div>
  );
};

export default Dictionary;