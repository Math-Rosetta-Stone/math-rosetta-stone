import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { mockDb, TermItem, GAMES } from "../constants";

const PracticeModal: React.FC = () => {
  const [currTermsIndex, setCurrTermsIndex] = useState<number[]>([]);
  const [currView, setCurrView] = useState<"selectTerms" | "selectGames">(
    "selectTerms"
  );

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {currView === "selectTerms" ? (
        <TermMenu
          setCurrTermsIndex={setCurrTermsIndex}
          setCurrView={setCurrView}
        />
      ) : (
        <GameMenu setCurrView={setCurrView} />
      )}
    </div>
  );
};

type TermMenuProps = {
  setCurrTermsIndex: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrView: React.Dispatch<
    React.SetStateAction<"selectTerms" | "selectGames">
  >;
};

const TermMenu: React.FC<TermMenuProps> = ({
  setCurrTermsIndex,
  setCurrView,
}) => {
  const [selectedTerms, setSelectedTerms] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    setSelectedTerms((prevState) =>
      prevState.includes(index)
        ? prevState.filter((i) => i !== index)
        : [...prevState, index]
    );
  };

  const handleView = () => {
    setCurrTermsIndex(selectedTerms);
    setCurrView("selectGames");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockDb.map((termItem: TermItem, index: number) => (
          <label
            key={index}
            className="flex items-center bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300"
          >
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
        className="absolute right-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

const GameMenu: React.FC<{
  setCurrView: React.Dispatch<
    React.SetStateAction<"selectTerms" | "selectGames">
  >;
}> = ({ setCurrView }) => {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GAMES.map((game, index) => (
          <label
            key={index}
            className="flex items-center bg-green-300 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{game}</span>
          </label>
        ))}
      </div>
      <button
        className="absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300"
        onClick={() => setCurrView("selectTerms")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default PracticeModal;
