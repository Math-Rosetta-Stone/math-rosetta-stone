"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { withAuth } from "@/lib/withAuth";
import { SelectUser } from "@/app/db/schema";
import { useGameData } from "@/app/hooks/useGameData";
import LoadingAnimation from "@/components/ui/loadinganimation";
import GameRenderer from "./_components/GameRenderer";

interface MapProps {
  user: SelectUser;
}

const Map: React.FC<MapProps> = () => {
  const params = useParams();
  const router = useRouter();
  const { levels } = useGameData();
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [minigameName, setMinigameName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const branchNo = params?.branch ? parseInt(params.branch as string, 10) : null;
  const chapterNo = params?.chapter ? parseInt(params.chapter as string, 10) : null;
  const levelNo = params?.level ? parseInt(params.level as string, 10) : null;

  useEffect(() => {
    const checkPermissionAndLevel = async () => {
      if (!branchNo || !chapterNo || !levelNo) {
        setError("Invalid route parameters");
        setIsLoading(false);
        return;
      }

      // Wait for levels data to load
      if (!levels) {
        return;
      }

      try {
        // Fetch permission for this branch
        const permissionResponse = await fetch(`/api/permission/${branchNo}`);
        if (!permissionResponse.ok) {
          setError("Failed to fetch permission");
          setIsLoading(false);
          return;
        }

        const permissionData = await permissionResponse.json();
        const permission = permissionData.payload;

        // Check if user has permission
        // User has permission if:
        // 1. curr_chapter_no > requested chapter_no, OR
        // 2. curr_chapter_no === requested chapter_no AND curr_level_no >= requested level_no
        const hasAccess = 
          permission.curr_chapter_no > chapterNo ||
          (permission.curr_chapter_no === chapterNo && permission.curr_level_no >= levelNo);

        if (!hasAccess) {
          setError("You don't have permission to access this level yet. Complete previous levels first.");
          setIsLoading(false);
          return;
        }

        setHasPermission(true);

        // Find the level data
        const levelData = levels.find(
          (level) =>
            level.branch_no === branchNo &&
            level.chapter_no === chapterNo &&
            level.level_no === levelNo
        );

        if (!levelData) {
          setError("Level not found");
          setIsLoading(false);
          return;
        }

        // Handle "random" minigame
        let gameName = levelData.minigame_name;
        if (gameName === "random") {
          // Import and use selectRandomGame
          const { selectRandomGame } = await import("@/app/map/_helpers/selectgame");
          gameName = selectRandomGame();
        }

        setMinigameName(gameName);
        setIsLoading(false);
      } catch (err) {
        console.error("Error checking permission:", err);
        setError("An error occurred while checking permissions");
        setIsLoading(false);
      }
    };

    checkPermissionAndLevel();
  }, [branchNo, chapterNo, levelNo, levels]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold text-red-600 mb-4">{error}</div>
        <button
          onClick={() => router.push(`/map/${branchNo || 1}/1/1`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Go to Map
        </button>
      </div>
    );
  }

  if (!hasPermission || !minigameName || !branchNo || !chapterNo || !levelNo) {
    return <LoadingAnimation />;
  }

  return (
    <GameRenderer
      gameType={minigameName}
      branchNo={branchNo}
      chapterNo={chapterNo}
      levelNo={levelNo}
    />
  );
};

export default withAuth(Map);

