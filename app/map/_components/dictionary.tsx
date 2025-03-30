import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLanguages } from "../../hooks/useLanguages";
import { useAllTerms } from "../../hooks/useAllTerms";
import { useTranslations } from "../../hooks/useTranslations";

// Todo: Fetech branch names from the db instead of hardcoding them
// Map branch_no to branch names
const BRANCH_NAMES: Record<number, string> = {
  1: "Calculus",
  2: "Algebra",
  3: "Geometry",
  4: "Trigonometry",
  5: "Statistics",
  6: "Probability",
  7: "LinearAlgebra",
  // Add more mappings as needed
};

const Dictionary: React.FC = () => {
  const [currTermItem, setCurrTermItem] = useState<any | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("French"); // Default language set to French
  const { languages, isLoading: isLoadingLanguages, isError: isErrorLanguages } = useLanguages();
  const { terms, isLoading: isLoadingTerms, isError: isErrorTerms } = useAllTerms();
  const { translations, isLoading: isLoadingTranslations, isError: isErrorTranslations } =
    useTranslations(selectedLanguage);

  return (
    <div className="w-full h-full bg-cornsilk p-4 overflow-auto">
      {/* Language Selector */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Language</h2>
        {isLoadingLanguages && <p>Loading languages...</p>}
        {isErrorLanguages && <p>Error loading languages. Please try again.</p>}
        {!isLoadingLanguages && !isErrorLanguages && (
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

      {/* Terms List */}
      {isLoadingTerms && <p>Loading terms...</p>}
      {isErrorTerms && <p>Error loading terms. Please try again.</p>}
      {!isLoadingTerms && !isErrorTerms && (
        <>
          {currTermItem ? (
            <DictItem
              termItem={currTermItem}
              goBack={() => setCurrTermItem(null)}
              selectedLanguage={selectedLanguage}
              translations={translations}
              isLoadingTranslations={isLoadingTranslations}
              isErrorTranslations={isErrorTranslations}
            />
          ) : (
            <TermMenu
              terms={terms}
              setCurrTermItem={setCurrTermItem}
              selectedLanguage={selectedLanguage}
            />
          )}
        </>
      )}
    </div>
  );
};

const TermMenu: React.FC<{
  terms: any[];
  setCurrTermItem: (termItem: any) => void;
  selectedLanguage: string;
}> = ({ terms, setCurrTermItem, selectedLanguage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {terms.map((termItem, index) => (
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
  termItem: any;
  goBack: () => void;
  selectedLanguage: string;
  translations: { term: string; translation: string }[];
  isLoadingTranslations: boolean;
  isErrorTranslations: boolean;
}> = ({
  termItem,
  goBack,
  selectedLanguage,
  translations,
  isLoadingTranslations,
  isErrorTranslations,
}) => {
    const { term, definition, example, branch_no } = termItem;

    // Map branch_no to branch name
    const branchName = BRANCH_NAMES[branch_no] || "Unknown";

    // Remove spaces from the term and convert it to lowercase for the image URL
    const sanitizedTerm = term.toLowerCase().replace(/\s+/g, "");

    // Construct the image URL dynamically using branch name and sanitized term
    const imageUrl = `/terms/${branchName}/regular/${sanitizedTerm}_julius.png`;

    // Find the translated definition for the current term
    const translatedDefinition =
      translations.find((t) => t.term === term)?.translation || "Translation not available";

    return (
      <div className="flex flex-col w-full h-full overflow-auto">
        <button
          onClick={goBack}
          className="absolute left-8 top-4 text-2xl text-gray-500 font-bold py-2 px-4 rounded hover:text-white transition duration-300">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex flex-col items-center justify-center flex-grow p-6">
          <h1 className="font-mono font-bold text-gray-800 text-4xl mb-2">{term}</h1>
          <p className="text-gray-600 mb-4 text-2xl">
            <span className="font-semibold text-gray-800">Definition (English):</span> {definition}
          </p>
          {isLoadingTranslations && <p>Loading translation...</p>}
          {isErrorTranslations && <p>Error loading translation.</p>}
          {!isLoadingTranslations && !isErrorTranslations && (
            <p className="text-gray-600 mb-4 text-2xl">
              <span className="font-semibold text-gray-800">Translated Definition:</span>{" "}
              {translatedDefinition}
            </p>
          )}
          <p className="text-gray-600 mb-4 text-2xl">
            <span className="font-semibold text-gray-800">Example:</span> {example}
          </p>
          {/* Display the dynamically constructed image */}
          <img
            src={imageUrl}
            alt={term}
            height={500}
            width={400}
            className="max-w-xs max-h-xs rounded-lg"
          />
        </div>
      </div>
    );
  };

export default Dictionary;