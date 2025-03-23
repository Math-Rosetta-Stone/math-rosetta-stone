import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import { useRouter } from "next/navigation";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { SelectLevel } from "@/app/db/schema";
import { usePermission } from "@/app/hooks/usePermission";
import { selectRandomGame } from "../../helpers/selectgame";
import { gameIcon } from "../../helpers/icon";

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
  const { currBranch, setGamePosition } = useContext(GamePositionContext);
  const { permissions } = usePermission();
  const [locked, setLocked] = useState(true);
  const [current, setCurrent] = useState(false);

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

  const isLevelLocked = () => {
    const {
      chapter_no: highestUnlockedChapter,
      level_no: highestUnlockedLevel,
    } = permissions.filter(perm => perm.branch_no === currBranch)[0];

    return (
      highestUnlockedChapter < level.chapter_no ||
      (highestUnlockedChapter === level.chapter_no &&
        highestUnlockedLevel < level.level_no)
    );
  };

  const isLevelCurrent = () => {
    const {
      chapter_no: highestUnlockedChapter,
      level_no: highestUnlockedLevel,
    } = permissions.filter(perm => perm.branch_no === currBranch)[0];

    return (
      highestUnlockedChapter === level.chapter_no &&
      highestUnlockedLevel === level.level_no
    );
  };

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

  useEffect(() => {
    setLocked(isLevelLocked());
    setCurrent(isLevelCurrent());
    console.log("UPDATED locked and current");
  }, [permissions]);

  return (
    <Marker
      position={[level.y, level.x]}
      icon={gameIcon(level.level_no, level.minigame_name, locked, current)}
      draggable={isAdmin}
      eventHandlers={{
        click: !locked ? handleClick : undefined,
        dragend: isAdmin ? handleDragEnd : undefined,
      }}
    />
  );
};

export default MiniGameMarker;
