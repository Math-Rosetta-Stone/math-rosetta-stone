import React, { useContext, useEffect, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MiniGameMarker from "./marker/minigamemarker";
import MapComponent from "./mapcomponent";
import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../_constants/constants";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useGameData } from "@/app/hooks/useGameData";
import { SelectLevel } from "@/app/db/schema";

interface MiniGameMapProps {
  isAdmin?: boolean;
  levels?: SelectLevel[];
  setLevels?: React.Dispatch<React.SetStateAction<SelectLevel[]>>;
  currBranch: number;
}

const MiniGameMap: React.FC<MiniGameMapProps> = ({
  isAdmin = false,
  levels: propLevels,
  setLevels: propSetLevels,
  currBranch,
}) => {
  const { levels: levelsData } = useGameData();
  const [imageOverlayKey, setImageOverlayKey] = useState<number>(currBranch);
  const [localLevels, setLocalLevels] = useState<SelectLevel[]>([]);

  // Use either props or local state depending on isAdmin mode
  const levels = propLevels || localLevels;
  const setLevels = propSetLevels || setLocalLevels;

  useEffect(() => {
    if (isAdmin) {
      if (typeof window !== "undefined") {
        const savedLevels = localStorage.getItem("levels");
        if (savedLevels) {
          setLevels(JSON.parse(savedLevels));
        } else if (levelsData) {
          setLevels(levelsData);
        }
      } else if (levelsData) {
        setLevels(levelsData);
      }
    } else {
      if (levelsData) {
        setLevels(levelsData);
      }
    }
  }, [levelsData, isAdmin, setLevels]);

  useEffect(() => {
    setImageOverlayKey(currBranch);
  }, [currBranch]);

  const filteredLevels = levels?.filter(level => level.branch_no === currBranch) || [];

  return (
    <div className="relative w-full h-full overflow-hidden no-select">
      <MapContainer
        center={[500, 500]}
        zoom={1}
        className="w-full h-full"
        crs={L.CRS.Simple}
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <MapComponent bounds={MAP_BOUNDS} />
        <ImageOverlay
          key={imageOverlayKey}
          url={`/${BRANCH_MAPS_PATHS[currBranch]}`}
          bounds={MAP_BOUNDS}
        />
        {filteredLevels.map(level => (
          <MiniGameMarker
            key={`${level.branch_no}-${level.chapter_no}-${level.level_no}`}
            level={level}
            isAdmin={isAdmin}
            setLevels={setLevels}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MiniGameMap;

