"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { MOCK_DB, TermItem } from "../../constants/constants";
import { PracticeModalContext } from "../../../contexts/practicemodelproviders";
import { cn } from "@/lib/utils";
import "./transition.css";

type TermMenuProps = {
  setCurrView: React.Dispatch<
    React.SetStateAction<"selectTerms" | "selectGames">
  >;
};

export const TermMenu: React.FC<TermMenuProps> = ({ setCurrView }) => {
  const { termsIndex, setTermsIndex } = useContext(PracticeModalContext);
  const [selectedTerms, setSelectedTerms] = useState<number[]>(termsIndex);
  const [screenShake, setScreenShake] = useState(false);

  const handleCheckboxChange = (index: number) => {
    setSelectedTerms(prevState =>
      prevState.includes(index)
        ? prevState.filter(i => i !== index)
        : [...prevState, index]
    );
  };

  const handleView = () => {
    if (selectedTerms.length === 0) {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 500);
      return;
    }
    setTermsIndex(selectedTerms);
    setCurrView("selectGames");
  };

  return (
    <div className={cn("w-full", screenShake && "shake")}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_DB.map((termItem: TermItem, index: number) => (
          <label
            key={index}
            className="flex items-center bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300">
            <input
              type="checkbox"
              checked={selectedTerms.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox h-5 w-5 transition duration-150 ease-in-out"
            />
            <span className="ml-3">{termItem.term}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleView}
        className={cn(
          "absolute right-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300",
          screenShake && "visibility: hidden"
        )}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
