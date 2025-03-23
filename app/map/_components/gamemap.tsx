import React, { useContext, useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MiniGameMarker from "./marker/minigamemarker";
import { BranchMarker } from "./marker/branchMarker";
import MapComponent from "./mapcomponent";
import HomeButton from "./HomeButton";

import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../constants/constants";
import BRANCH_LOCATIONS from "../constants/branchLocation.json";
import CHAPTER_LOCATIONS from "../constants/chapterLocation.json";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useGameData } from "@/app/hooks/useGameData";
import { level, SelectLevel } from "@/app/db/schema";
import { useQuery } from "@tanstack/react-query";
import { usePermission } from "@/app/hooks/usePermission";
import { useTerms } from "@/app/hooks/useTerms";
import { ChapterMarker } from "./marker/chapterMarker";

interface GameMapProps {
  isAdmin?: boolean;
  levels?: SelectLevel[];
  setLevels?: React.Dispatch<React.SetStateAction<SelectLevel[]>>;
}

const GameMap: React.FC<GameMapProps> = ({
  isAdmin = false,
  levels: propLevels,
  setLevels: propSetLevels,
}) => {
  const { gamePosition, currBranch } = useContext(GamePositionContext);

  const { levels: levelsData, branches: branchesData } = useGameData();
  const [imageOverlayKey, setImageOverlayKey] = useState<number>(currBranch); // for image overlay
  const [localLevels, setLocalLevels] = useState<SelectLevel[]>([]);

  // Use either props or local state depending on isAdmin mode
  const levels = propLevels || localLevels;
  const setLevels = propSetLevels || setLocalLevels;

  useTerms();
  // Find the current branch data
  const currentBranchData = branchesData?.find(
    branch => branch.branch_no === currBranch
  );

  useEffect(() => {
    console.log("currentBranchData", currentBranchData);
    if (isAdmin) {
      const savedLevels = localStorage.getItem("levels");
      if (savedLevels) {
        setLevels(JSON.parse(savedLevels));
      } else if (levelsData) {
        setLevels(levelsData);
      }
    } else {
      if (levelsData) {
        setLevels(levelsData);
      }
    }
  }, [levelsData, isAdmin, setLevels]);

  return (
    <div className="relative w-full h-full overflow-hidden no-select">
      <MapContainer
        center={[500, 500]}
        zoom={1}
        className="w-full h-full"
        crs={L.CRS.Simple}
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0}>
        <MapComponent bounds={MAP_BOUNDS} />
        <HomeButton />
        <ImageOverlay
          key={imageOverlayKey}
          url={`/${BRANCH_MAPS_PATHS[currBranch]}`}
          bounds={MAP_BOUNDS}
        />
        {currBranch === 0 &&
          Array.from({ length: 4 }).map((_, index) => (
            <BranchMarker
              key={index + 1}
              location={BRANCH_LOCATIONS[index]}
              targetBranch={index + 1}
              setImageOverlayKey={setImageOverlayKey}
            />
          ))}
        {currBranch === 1 &&
          gamePosition[currBranch].chapter_no === 0 &&
          currentBranchData && // Only render if we have branch data
          Array.from({ length: currentBranchData.no_of_chapters }).map(
            (_, index) => (
              <ChapterMarker
                key={index + 1}
                location={CHAPTER_LOCATIONS[index]}
                targetChapter={index + 1}
                isAdmin={isAdmin}
              />
            )
          )}
        {currBranch !== 0 &&
          gamePosition[currBranch]?.chapter_no > 0 &&
          levels &&
          levels
            .filter(level => level.branch_no === currBranch)
            .map(level => (
              <MiniGameMarker
                key={level.level_no}
                level={level}
                isAdmin={isAdmin}
                setLevels={setLevels}
              />
            ))}
      </MapContainer>
    </div>
  );
};

export default GameMap;
