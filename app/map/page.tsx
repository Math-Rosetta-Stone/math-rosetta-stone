"use client";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChalkboardTeacher,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import "./css/map.css";
import Dictionary from "./_components/dictionary";
import PracticeModal from "./_components/practicemode/practicemodal";
import { GamePositionContext } from "../contexts/gamepositionproviders";
import { withAuth } from "@/lib/withAuth";
import GameMap from "./_components/gamemap";
import { SelectLevel, SelectUser } from "../db/schema";
import Link from "next/link";

interface MapProps {
  user: SelectUser;
}

const Map: React.FC<MapProps> = ({ user }) => {
  const [currScreen, setCurrScreen] = useState<"map" | "dict" | "practice">(
    "map"
  );

  const [levels, setLevels] = useState<SelectLevel[]>([]);

  useEffect(() => {
    console.log("admin", user.is_admin);
  }, []);

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
          {user.is_admin && (
            <Link
              href="/admin/map"
              className="py-2 px-4 rounded-lg bg-purple-600 text-white ml-auto flex items-center">
              <FontAwesomeIcon icon={faUsersCog} className="mr-2" />
              Admin Panel
            </Link>
          )}
        </div>

        <div className="flex-1 rounded-lg overflow-hidden bg-white shadow-lg">
          {currScreen === "map" && (
            <GameMap levels={levels} setLevels={setLevels} />
          )}
          {currScreen === "dict" && <Dictionary />}
          {currScreen === "practice" && <PracticeModal />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Map);
