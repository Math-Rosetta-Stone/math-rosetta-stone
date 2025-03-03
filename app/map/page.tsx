"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChalkboardTeacher,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import "./css/map.css";
import Dictionary from "./_components/dictionary";
import PracticeModal from "./_components/practicemode/practicemodal";
import { GamePositionContext } from "../contexts/gamepositionproviders";
import { withAuth } from "@/lib/withAuth";
import GameMap from "./_components/gamemap";
import { SelectLevel } from "../db/schema";

const Map: React.FC = () => {
  const [currScreen, setCurrScreen] = useState<"map" | "dict" | "practice">(
    "map"
  );

  const { currBranch, gamePosition } = useContext(GamePositionContext);
  const [levels, setLevels] = useState<SelectLevel[]>([]);
  const saveLevels = () => {
    localStorage.setItem("levels", JSON.stringify(levels));
  };

  return (
    <div className="w-screen h-screen bg-blue-900 flex flex-col">
      <div className="flex-1 flex">
        <div className="left-controller w-36 h-full bg-nintendo-red p-4 flex items-center justify-center"></div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute z-10 top-4">
            <h1 className="font-mono font-bold text-gray-200 text-4xl">
              {gamePosition?.[currBranch]?.branch_no}-
              {gamePosition?.[currBranch]?.chapter_no}
            </h1>
          </div>
          <div className="relative w-full h-full max-w-6xl max-h-128 overflow-hidden bg-foggy-gray pl-4 pr-4 pt-16 pb-16">
            {(() => {
              switch (currScreen) {
                case "dict":
                  return <Dictionary />;
                case "practice":
                  return <PracticeModal />;
                default:
                  return (
                    <GameMap
                      isAdmin={true}
                      levels={levels}
                      setLevels={setLevels}
                    />
                  );
              }
            })()}
          </div>
        </div>
        <div className="right-controller w-36 h-full bg-nintendo-blue p-4 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 p-2 bg-blue-500 hover:bg-blue-300 text-white z-10 rounded-full w-12 h-12"
            title="Dictionary"
            onClick={() =>
              setCurrScreen(currScreen =>
                currScreen === "map" ? "dict" : "map"
              )
            }>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          <button
            className="absolute top-4 right-20 p-2 bg-blue-500 hover:bg-blue-300 text-white z-10 rounded-full w-12 h-12"
            title="Practice Mode"
            onClick={() =>
              setCurrScreen(currScreen =>
                currScreen === "map" ? "practice" : "map"
              )
            }>
            <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" />
          </button>
          <button
            className="absolute top-20 right-20 p-2 bg-blue-500 hover:bg-blue-300 text-white z-10 rounded-full w-12 h-12"
            title="Admin Mode"
            onClick={() => {
              saveLevels();
            }}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Map);
