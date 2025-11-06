import React, { useContext } from "react";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { SelectLevel } from "@/app/db/schema";
import BranchMap from "./branchmap";
import MiniGameMap from "./minigamemap";
import { useTerms } from "@/app/hooks/useTerms";

interface GameMapProps {
  isAdmin?: boolean;
  levels?: SelectLevel[];
  setLevels?: React.Dispatch<React.SetStateAction<SelectLevel[]>>;
  currBranchOverride?: number;
}

const GameMap: React.FC<GameMapProps> = ({
  isAdmin = false,
  levels,
  setLevels,
  currBranchOverride,
}) => {
  const { currBranch: contextBranch } = useContext(GamePositionContext);
  const currBranch = currBranchOverride !== undefined ? currBranchOverride : contextBranch;

  useTerms();

  // When currBranch === 0, we need to show the general map with all branches
  // This would need a separate component or we handle it differently
  // For now, if currBranch > 0, show BranchMap with chapter markers
  // If currBranch === 0, we'd show branch markers (not implemented yet)
  
  // When currBranch > 0, show the branch map with chapter markers
  if (currBranch > 0) {
    return <BranchMap branchNo={currBranch} isAdmin={isAdmin} />;
  }

  // When currBranch === 0, show mini game map (this might need to be changed to show branches)
  // For now, this is a fallback - might need a GeneralMap component
  return (
    <MiniGameMap
      isAdmin={isAdmin}
      levels={levels}
      setLevels={setLevels}
      currBranch={currBranch}
    />
  );
};

export default GameMap;
