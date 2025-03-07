import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MOCK_DB, TermItem } from "../constants/constants";

const Dictionary: React.FC = () => {
  const [currTermItem, setCurrTermItem] = useState<TermItem | null>(null);

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {currTermItem ? (
        <DictItem
          termItem={currTermItem}
          goBack={() => setCurrTermItem(null)}
        />
      ) : (
        <TermMenu setCurrTermItem={setCurrTermItem} />
      )}
    </div>
  );
};

const TermMenu: React.FC<{ setCurrTermItem: (termItem: TermItem) => void }> = ({
  setCurrTermItem,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {MOCK_DB.map(
        (termItem: TermItem, index: React.Key | null | undefined) => (
          <button
            key={index}
            className="bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300"
            onClick={() => setCurrTermItem(termItem)}>
            {termItem.term}
          </button>
        )
      )}
    </div>
  );
};

const DictItem: React.FC<{ termItem: TermItem; goBack: () => void }> = ({
  termItem,
  goBack,
}) => {
  const { term, definition, example, image } = termItem;
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <button
        onClick={goBack}
        className="absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="font-mono font-bold text-gray-800 text-4xl mb-2">
          {term}
        </h1>
        <p className="text-gray-600 mb-4 text-2xl">
          <span className="font-semibold text-gray-800">Definition:</span>{" "}
          {definition}
        </p>
        <p className="text-gray-600 mb-4 text-2xl">
          <span className="font-semibold text-gray-800">Example:</span>{" "}
          {example}
        </p>
        {image && (
          <img
            src={image.url}
            alt={term}
            height={300}
            width={200}
            className="max-w-xs max-h-xs rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default Dictionary;
