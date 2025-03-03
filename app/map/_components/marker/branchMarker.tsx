import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { DivIcon, LatLngExpression } from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";

interface BranchMarkerProps {
  location: { x: number; y: number };
  targetBranch: number;
  targetChapter: number;
  setImageOverlayKey: (key: number) => void;
  isAdmin?: boolean;
}

export const BranchMarker: React.FC<BranchMarkerProps> = ({
  location,
  targetBranch,
  targetChapter,
  setImageOverlayKey,
  isAdmin,
}) => {
  const { setGamePosition, setCurrBranch } = useContext(GamePositionContext);
  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: yellow; width: 50px; height: 50px; border-radius: 50%; cursor: pointer;"></div>`,
  });

  const position: LatLngExpression = [location.y, location.x];
  const handleClick = () => {
    setImageOverlayKey(targetBranch);
    setCurrBranch(targetBranch);
    setGamePosition({
      branch_no: targetBranch,
      chapter_no: targetChapter,
      level_no: 0,
    });
  };

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};
