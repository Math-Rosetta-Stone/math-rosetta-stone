import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MOCK_DB, TermItem } from "../constants/constants";
import { useLanguages } from "../../hooks/useLanguages";

const Dictionary: React.FC = () => {
  const [currTermItem, setCurrTermItem] = useState<TermItem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English"); // Default language
  const { languages, isLoading, isError } = useLanguages();

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {/* Language Selector */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Language</h2>
        {isLoading && <p>Loading languages...</p>}
        {isError && <p>Error loading languages. Please try again.</p>}
        {!isLoading && !isError && (
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border rounded">
            {languages.map((language) => (
              <option key={language.id} value={language.name}>
                {language.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {currTermItem ? (
        <DictItem
          termItem={currTermItem}
          goBack={() => setCurrTermItem(null)}
          selectedLanguage={selectedLanguage}
        />
      ) : (
        <TermMenu
          setCurrTermItem={setCurrTermItem}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
};

const TermMenu: React.FC<{
  setCurrTermItem: (termItem: TermItem) => void;
  selectedLanguage: string;
}> = ({ setCurrTermItem, selectedLanguage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {MOCK_DB.map((termItem: TermItem, index: React.Key | null | undefined) => (
        <button
          key={index}
          className="bg-amber-300 text-white font-bold py-2 px-4 rounded hover:bg-amber-500 transition duration-300"
          onClick={() => setCurrTermItem(termItem)}
        >
          {/* Safely access translations and provide a fallback */}
          {termItem.translations?.[selectedLanguage] || termItem.term}
        </button>
      ))}
    </div>
  );
};
const DictItem: React.FC<{
  termItem: TermItem;
  goBack: () => void;
  selectedLanguage: string;
}> = ({ termItem, goBack, selectedLanguage }) => {
  const { term, definition, example, image, translations } = termItem;

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <button
        onClick={goBack}
        className="absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="font-mono font-bold text-gray-800 text-4xl mb-2">
          {/* Safely access translations and provide a fallback */}
          {translations?.[selectedLanguage] || term}
        </h1>
        <p className="text-gray-600 mb-4 text-2xl">
          <span className="font-semibold text-gray-800">Definition:</span>{" "}
          {translations?.[selectedLanguage] || definition}
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