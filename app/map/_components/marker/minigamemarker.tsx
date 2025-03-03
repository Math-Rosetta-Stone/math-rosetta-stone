import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { useRouter } from "next/navigation";
import { DivIcon } from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { SelectLevel } from "@/app/db/schema";
import { usePermission } from "@/app/hook/usePermission";
import { selectRandomGame } from "../../helpers/selectgame";
import { GamePosition } from "@/types/db";

interface MiniGameMarkerProps {
  level: SelectLevel;
  isAdmin?: boolean;
  setLevels: React.Dispatch<React.SetStateAction<SelectLevel[]>>;
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({
  level,
  isAdmin = false,
  setLevels,
}) => {
  const router = useRouter();
  const { setGamePosition } = useContext(GamePositionContext);
  const { permissions } = usePermission();
  const { currBranch } = useContext(GamePositionContext);
  useEffect(() => {
    console.log("setLevels", setLevels);
  }, [setLevels]);

  const handleClick = () => {
    setGamePosition({
      level_no: level.level_no,
      branch_no: level.branch_no,
      chapter_no: level.chapter_no,
    });
    if (level.minigame_name === "random") {
      const gameName = selectRandomGame();
      router.push(`/game/${gameName}`);
    } else {
      router.push(`/game/${level.minigame_name}`);
    }
  };

  const have_permission = (permissions: GamePosition[], level: SelectLevel) => {
    const permission = permissions.filter(
      permission => permission.branch_no === currBranch
    )[0];
    if (
      permission.chapter_no > level.chapter_no ||
      (permission.chapter_no === level.chapter_no &&
        permission.level_no > level.level_no)
    )
      return true;
    return false;
  };

  const iconColor = have_permission(permissions, level) ? "green" : "red";

  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
  });

  const handleDragEnd = (event: L.DragEndEvent) => {
    if (isAdmin) {
      const marker = event.target;
      setLevels(levels =>
        levels.map(prevLevel =>
          prevLevel.branch_no === level.branch_no &&
          prevLevel.chapter_no === level.chapter_no &&
          prevLevel.level_no === level.level_no
            ? {
                ...prevLevel,
                y: marker.getLatLng().lat,
                x: marker.getLatLng().lng,
              }
            : prevLevel
        )
      );
    }
  };

  return (
    <Marker
      position={[level.y, level.x]}
      icon={icon}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
        dragend: isAdmin ? handleDragEnd : undefined,
      }}
    />
  );
};

export default MiniGameMarker;
