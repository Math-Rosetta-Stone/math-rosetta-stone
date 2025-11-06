"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChalkboardTeacher,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/map.css";
import Dictionary from "../../_components/dictionary";
import PracticeModal from "../../_components/practicemode/practicemodal";
import { withAuth } from "@/lib/withAuth";
import { SelectLevel, SelectUser } from "@/app/db/schema";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGameData } from "@/app/hooks/useGameData";

const MiniGameMap = dynamic(() => import("../../_components/minigamemap"), {
  ssr: false,
});

interface MapProps {
  user: SelectUser;
}

const Map: React.FC<MapProps> = ({ user }) => {
  const params = useParams();
  const [currScreen, setCurrScreen] = useState<"map" | "dict" | "practice">(
    "map"
  );
  const [levels, setLevels] = useState<SelectLevel[]>([]);
  const { levels: levelsData } = useGameData();

  const branchNo = params?.branch ? parseInt(params.branch as string, 10) : null;
  const chapterNo = params?.chapter ? parseInt(params.chapter as string, 10) : null;

  // Filter levels for this specific chapter
  useEffect(() => {
    if (levelsData && branchNo && chapterNo) {
      const filteredLevels = levelsData.filter(
        level => level.branch_no === branchNo && level.chapter_no === chapterNo
      );
      setLevels(filteredLevels);
    }
  }, [levelsData, branchNo, chapterNo]);

  if (!branchNo || !chapterNo) {
    return null;
  }

  return (
    <div className="relative h-screen p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="flex flex-col h-full max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            className={`py-2 px-4 rounded-lg ${
              currScreen === "map" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrScreen("map")}>
            Map
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              currScreen === "dict" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrScreen("dict")}>
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Dictionary
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              currScreen === "practice"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrScreen("practice")}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            Practice
          </button>

          {/* Admin Panel Link - only shown to admins */}
          
        </div>

        <div className="flex-1 rounded-lg overflow-hidden bg-white shadow-lg">
          {currScreen === "map" && (
            <MiniGameMap 
              levels={levels} 
              setLevels={setLevels} 
              currBranch={branchNo}
              currChapter={chapterNo}
            />
          )}
          {currScreen === "dict" && <Dictionary />}
          {currScreen === "practice" && <PracticeModal />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Map);



