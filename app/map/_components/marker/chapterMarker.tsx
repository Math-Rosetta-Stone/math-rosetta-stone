"use client";

import React from "react";
import { Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useRouter } from "next/navigation";
import { chapterIcon } from "../../_helpers/icon";

interface ChapterMarkerProps {
  position: LatLngExpression;
  targetBranch: number;
  chapterNo: number;
  setImageOverlayKey?: (key: number) => void;
  isAdmin?: boolean;
}

export const ChapterMarker: React.FC<ChapterMarkerProps> = ({
  position,
  targetBranch,
  chapterNo,
  setImageOverlayKey,
  isAdmin = false,
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (setImageOverlayKey) {
      setImageOverlayKey(targetBranch);
    }
    // Navigate to the chapter map which shows levels
    router.push(`/map/${targetBranch}/${chapterNo}`);
  };

  return (
    <Marker
      position={position}
      icon={chapterIcon(chapterNo)}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};

