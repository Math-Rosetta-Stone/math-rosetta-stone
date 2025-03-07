"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChalkboardTeacher,
  faFloppyDisk,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "../../map/css/map.css";
import Dictionary from "../../map/_components/dictionary";
import PracticeModal from "../../map/_components/practicemode/practicemodal";
import { GamePositionContext } from "../../contexts/gamepositionproviders";
import { withAdmin } from "@/lib/withAdmin";
import GameMap from "../../map/_components/gamemap";
import { SelectLevel } from "../../db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { useGameData } from "@/app/hook/useGameData";

const AdminMap: React.FC = () => {
  const [currScreen, setCurrScreen] = useState<"map" | "dict" | "practice">(
    "map"
  );
  const { currBranch, gamePosition } = useContext(GamePositionContext);
  const [levels, setLevels] = useState<SelectLevel[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { refreshGameData } = useGameData();

  const saveLevels = async () => {
    try {
      setIsSaving(true);

      // Save to localStorage as a backup
      localStorage.setItem("levels", JSON.stringify(levels));

      // Save to database
      const response = await fetch("/api/levels/bulk-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(levels),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save levels");
      }

      // Success - update React Query cache
      await refreshGameData();

      alert("Map configurations saved successfully to database!");
    } catch (error) {
      console.error("Error saving levels:", error);
      alert(
        `Error saving levels: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative h-screen p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="flex flex-col h-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <button
              className={`py-2 px-4 rounded-lg ${
                currScreen === "map" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrScreen("map")}>
              Map Editor
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
          </div>

          <div className="flex items-center">
            <span className="font-semibold text-xl text-purple-700 mr-2">
              ADMIN MODE
            </span>
            <FontAwesomeIcon icon={faUsers} className="text-purple-700" />
          </div>

          <button
            className={`py-2 px-4 rounded-lg ${
              isSaving ? "bg-gray-500" : "bg-green-500"
            } text-white`}
            onClick={saveLevels}
            disabled={isSaving}>
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="flex-1 rounded-lg overflow-hidden bg-white shadow-lg">
          {currScreen === "map" && (
            <GameMap isAdmin={true} levels={levels} setLevels={setLevels} />
          )}
          {currScreen === "dict" && <Dictionary />}
          {currScreen === "practice" && <PracticeModal />}
        </div>
      </div>
    </div>
  );
};

export default withAdmin(AdminMap);
