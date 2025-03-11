import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { branchIcon } from "../../helpers/icon";

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
      icon={branchIcon(targetBranch)}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};
