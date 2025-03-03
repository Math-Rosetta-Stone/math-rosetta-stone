import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MiniGameMarker from "./marker/minigameMarker";
import { BranchMarker } from "./marker/branchMarker";
import MapComponent from "./mapcomponent";

import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../constants";
import MAP_LOCATIONS from "../constants/mapLocation.json";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useGameData } from "@/app/hook/useGameData";
import { SelectLevel } from "@/app/db/schema";

const GameMap: React.FC<{
  isAdmin?: boolean;
  levels: SelectLevel[];
  setLevels: React.Dispatch<React.SetStateAction<SelectLevel[]>>;
}> = ({ isAdmin = false, levels, setLevels }) => {
  const { currBranch, gamePosition } = useContext(GamePositionContext);
  const { levels: levelsData } = useGameData();
  const [imageOverlayKey, setImageOverlayKey] = useState<number>(currBranch); // force rerender when currBranch changes

  useEffect(() => {
    if (isAdmin) {
      setLevels(
        JSON.parse(localStorage.getItem("levels") || "[]")
          ? JSON.parse(localStorage.getItem("levels") || "[]")
          : levelsData
      );
    } else {
      setLevels(levelsData ?? []);
    }
  }, [levelsData]);

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
