import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { chapterIcon } from "../../helpers/icon";

interface ChapterMarkerProps {
  location: { x: number; y: number };
  targetChapter: number;
  isAdmin?: boolean;
}

export const ChapterMarker: React.FC<ChapterMarkerProps> = ({
  location,
  targetChapter,
  isAdmin,
}) => {
  const { setGamePosition, currBranch } = useContext(GamePositionContext);
  const position: LatLngExpression = [location.y, location.x];

  const handleClick = () => {
    // Include branch_no which is required by the updated type
    setGamePosition({
      branch_no: currBranch,
      chapter_no: targetChapter,
    });

    console.log(`Clicked on Chapter ${targetChapter} in Branch ${currBranch}`);
  };

  return (
    <Marker
      position={position}
      icon={chapterIcon(targetChapter)}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};
