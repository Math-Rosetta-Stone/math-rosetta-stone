import React, { useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChapterMarker } from "./marker/chapterMarker";
import MapComponent from "./mapcomponent";
import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../_constants/constants";
import universal_data from "@/universal_data.json";

interface BranchMapProps {
  setImageOverlayKey?: (key: number) => void;
  branchNo: number;
  isAdmin?: boolean;
}

const BranchMap: React.FC<BranchMapProps> = ({
  setImageOverlayKey: externalSetImageOverlayKey,
  branchNo,
  isAdmin = false,
}) => {
  const [localImageOverlayKey, setLocalImageOverlayKey] = useState<number>(0);
  
  // Use external setter if provided, otherwise use local state
  const handleImageOverlayKeyChange = externalSetImageOverlayKey || setLocalImageOverlayKey;
  const currentImageKey = externalSetImageOverlayKey ? 0 : localImageOverlayKey;

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
          key={currentImageKey}
          url={`/${BRANCH_MAPS_PATHS[branchNo]}`}
          bounds={MAP_BOUNDS}
        />
        {universal_data.branches[branchNo - 1]?.locations?.map((location, index) => {
          const chapterNo = index + 1;
          return (
            <ChapterMarker
              key={index}
              position={[location.y, location.x]}
              targetBranch={branchNo}
              chapterNo={chapterNo}
              setImageOverlayKey={handleImageOverlayKeyChange}
              isAdmin={isAdmin}
            />
          );
        }) || []}
      </MapContainer>
    </div>
  );
};

export default BranchMap;

