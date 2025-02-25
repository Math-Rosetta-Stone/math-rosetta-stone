import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { DivIcon, LatLngExpression } from "leaflet";
import { useGamePosition } from "@/app/hook/useGamePosition";
import { QueryClient } from "@tanstack/react-query";

interface MapMarkerProps {
  location: { x: number; y: number };
  targetBranch: number;
  targetChapter: number;
  queryClient: QueryClient;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  location,
  targetBranch,
  targetChapter,
  queryClient,
}) => {
  const { setGamePosition, setCurrBranch } = useGamePosition();
  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: yellow; width: 50px; height: 50px; border-radius: 50%; cursor: pointer;"></div>`,
  });

  const position: LatLngExpression = [location.y, location.x];
  // TODO:use the setter in useGamePosition to handle set chapter and land
  const handleClick = () => {
    // Set branch first
    setCurrBranch(targetBranch);

    // Then update game position
    setGamePosition({
      branch_no: targetBranch,
      chapter_no: targetChapter,
      level_no: 0,
    });

    // Invalidate the levels query
    queryClient.invalidateQueries({
      queryKey: ["levels", targetBranch, targetChapter],
    });
  };

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};
