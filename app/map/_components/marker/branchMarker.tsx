import React from "react";
import { Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useRouter } from "next/navigation";
import { branchIcon } from "../../_helpers/icon";

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
  const router = useRouter();
  const position: LatLngExpression = [location.y, location.x];
  const handleClick = () => {
    setImageOverlayKey(targetBranch);
    // Navigate to the branch map which shows chapters
    router.push(`/map/${targetBranch}`);
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
