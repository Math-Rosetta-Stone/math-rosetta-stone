import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { chapterIcon } from "../../helpers/icon";
import { usePermission } from "@/app/hooks/usePermission";

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
  const { permissions } = usePermission();
  const position: LatLngExpression = [location.y, location.x];

  // Determine chapter status based on permissions
  const getChapterStatus = () => {
    // Find the permission for the current branch
    const branchPermission = permissions.find(p => p.branch_no === currBranch);

    if (!branchPermission) {
      return "locked"; // Default to locked if no permission found
    }

    // If the user has completed this chapter (has access to a higher chapter)
    if (branchPermission.chapter_no > targetChapter) {
      return "completed";
    }

    // If this is the current chapter or the next unlocked chapter
    if (branchPermission.chapter_no === targetChapter) {
      return "current";
    }

    // If this chapter is one ahead of the current chapter, make it the next unlockable
    if (
      branchPermission.chapter_no === targetChapter - 1 &&
      branchPermission.level_no >= 3
    ) {
      return "current";
    }

    // Otherwise, the chapter is locked
    return "locked";
  };

  const chapterStatus = getChapterStatus();
  const isClickable = chapterStatus !== "locked" || isAdmin;

  const handleClick = () => {
    if (!isClickable && !isAdmin) return;

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
      icon={chapterIcon(targetChapter, chapterStatus)}
      draggable={isAdmin}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
};
