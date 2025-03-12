import React, { useContext, useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MiniGameMarker from "./marker/minigamemarker";
import { BranchMarker } from "./marker/branchMarker";
import MapComponent from "./mapcomponent";

import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../constants/constants";
import MAP_LOCATIONS from "../constants/mapLocation.json";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useGameData } from "@/app/hooks/useGameData";
import { SelectLevel } from "@/app/db/schema";
import { useQuery } from "@tanstack/react-query";
import { usePermission } from "@/app/hooks/usePermission";
import { useTerms } from "@/app/hooks/useTerms";

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
  // const { permissions } = usePermission();

  const { levels: levelsData } = useGameData();
  const [imageOverlayKey, setImageOverlayKey] = useState<number>(currBranch);
  const [localLevels, setLocalLevels] = useState<SelectLevel[]>([]);

  // Use either props or local state depending on isAdmin mode
  const levels = propLevels || localLevels;
  const setLevels = propSetLevels || setLocalLevels;

  // const getUnlockedTerms = async () => {
  //   let currLevel;
  //   for (let perm of permissions) {
  //     if (perm.branch_no === currBranch
  //       && perm.chapter_no === gamePosition[currBranch].chapter_no) {
  //       currLevel = perm.level_no;
  //       console.log("perm", perm);
  //       console.log("branch", currBranch);
  //       console.log("level", currLevel);
  //       break;
  //     }
  //   }
  //   const response = await fetch(`/api/terms?branch=${currBranch}&level=${currLevel}`);
  //   return (await response.json()).data;
  // };

  // const {data} = useQuery({
  //   queryKey: ["unlockedTerms"],
  //   queryFn: getUnlockedTerms,
  //   enabled: currBranch > 0,
  // });
  useTerms();

  useEffect(() => {
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
        crs={L.CRS.Simple} // Use Simple CRS for flat images
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0} // Ensure the map stays within bounds
      >
        <MapComponent bounds={MAP_BOUNDS} />
        <ImageOverlay
          key={imageOverlayKey}
          url={`/${BRANCH_MAPS_PATHS[currBranch]}`}
          bounds={MAP_BOUNDS}
        />
        {currBranch === 0 && (
          <>
            <BranchMarker
              location={MAP_LOCATIONS[0][0]}
              targetBranch={1}
              targetChapter={1}
              setImageOverlayKey={setImageOverlayKey}
            />
            <BranchMarker
              location={MAP_LOCATIONS[0][1]}
              targetBranch={2}
              targetChapter={1}
              setImageOverlayKey={setImageOverlayKey}
            />
            <BranchMarker
              location={MAP_LOCATIONS[0][2]}
              targetBranch={3}
              targetChapter={1}
              setImageOverlayKey={setImageOverlayKey}
            />
            <BranchMarker
              location={MAP_LOCATIONS[0][3]}
              targetBranch={4}
              targetChapter={1}
              setImageOverlayKey={setImageOverlayKey}
            />
          </>
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
