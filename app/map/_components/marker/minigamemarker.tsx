import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { useRouter } from "next/navigation";
import { DivIcon, LatLngExpression } from "leaflet";
import { GamePosition, Level } from "@/types/db";
import { Land_to_branch_no } from "../../constants";
import { useGamePosition } from "@/app/hook/useGamePosition";
import { SelectLevel } from "@/app/db/schema";
import { usePermission } from "@/app/hook/usePermission";
import { selectRandomGame } from "../../helpers/selectgame";
interface MiniGameMarkerProps {
  level: SelectLevel;
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({ level }) => {
  const router = useRouter();
  const { setGamePosition } = useGamePosition();
  const { permissions } = usePermission();
  const { currBranch } = useGamePosition();

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
    console.log(permissions);
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

  // y and x are reversed in the screen
  const position: LatLngExpression = [level.y, level.x];

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};

export default MiniGameMarker;
