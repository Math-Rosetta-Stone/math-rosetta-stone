"use client";

import {
  createContext,
  ReactNode,
  useMemo,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { GamePosition } from "@/types/db";
import { useGameData } from "@/app/hooks/useGameData";

interface GamePositionContextProps {
  gamePosition: GamePosition[];
  setGamePosition: (position: GamePosition) => void;
  incrementGamePosition: (branch_no: number) => void;
  currBranch: number;
  setCurrBranch: (branch: number) => void;
  currentPosition: GamePosition | null;
}

const INITIAL_GAME_POSITION: GamePosition[] = [
  { branch_no: 0, chapter_no: 0, level_no: 0 },
  { branch_no: 1, chapter_no: 1, level_no: 1 },
  { branch_no: 2, chapter_no: 1, level_no: 1 },
  { branch_no: 3, chapter_no: 1, level_no: 1 },
  { branch_no: 4, chapter_no: 1, level_no: 1 },
  { branch_no: 5, chapter_no: 1, level_no: 1 },
  { branch_no: 6, chapter_no: 1, level_no: 1 },
  { branch_no: 7, chapter_no: 1, level_no: 1 },
];

const GamePositionContext = createContext<GamePositionContextProps>({
  gamePosition: INITIAL_GAME_POSITION,
  setGamePosition: () => {},
  incrementGamePosition: () => {},
  currBranch: 1,
  setCurrBranch: () => {},
  currentPosition: null,
});

function GamePositionProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const { branches, chapters } = useGameData();

  // Read current position from URL params if on /map/[branch]/[chapter]/[level] route
  const currentPosition = useMemo<GamePosition | null>(() => {
    if (params?.branch && params?.chapter && params?.level) {
      const branch = parseInt(params.branch as string, 10);
      const chapter = parseInt(params.chapter as string, 10);
      const level = parseInt(params.level as string, 10);
      if (!isNaN(branch) && !isNaN(chapter) && !isNaN(level)) {
        return { branch_no: branch, chapter_no: chapter, level_no: level };
      }
    }
    return null;
  }, [params]);

  // Current branch from URL params or default to 1
  const currBranch = useMemo(() => {
    if (params?.branch) {
      const branch = parseInt(params.branch as string, 10);
      if (!isNaN(branch)) return branch;
    }
    return 1;
  }, [params]);

  // Build gamePosition array from URL params (for backward compatibility)
  const gamePosition = useMemo<GamePosition[]>(() => {
    const positions = [...INITIAL_GAME_POSITION];
    if (currentPosition) {
      const index = positions.findIndex(
        pos => pos.branch_no === currentPosition.branch_no
      );
      if (index !== -1) {
        positions[index] = currentPosition;
      }
    }
    return positions;
  }, [currentPosition]);

  const setGamePosition = (newPosition: GamePosition) => {
    // Navigate to the new position URL
    router.push(`/map/${newPosition.branch_no}/${newPosition.chapter_no}/${newPosition.level_no}`);
  };

  const setCurrBranch = (branch: number) => {
    // Navigate to first chapter and level of the branch
    router.push(`/map/${branch}/1/1`);
  };

  const incrementGamePosition = (branch_no: number) => {
    const currentPos = currentPosition || { branch_no, chapter_no: 1, level_no: 1 };
    
    // Find the current position for this branch
    const branchPos = currentPos.branch_no === branch_no ? currentPos : 
      gamePosition.find(pos => pos.branch_no === branch_no) || 
      { branch_no, chapter_no: 1, level_no: 1 };

    const newPosition = { ...branchPos };

    // Calculate next position
    const branchData = branches?.find(b => b.branch_no === branch_no);
    const chapterData = chapters?.find(c => c.chapter_no === branchPos.chapter_no);

    const isLastChapter = branchData?.no_of_chapters === branchPos.chapter_no;
    const isLastLevel = chapterData?.no_of_minigames === branchPos.level_no;

    if (isLastLevel && !isLastChapter) {
      // Move to next chapter, level 1
      newPosition.chapter_no = branchPos.chapter_no + 1;
      newPosition.level_no = 1;
    } else if (isLastLevel && isLastChapter) {
      // Already at the end, don't increment
      return;
    } else {
      // Increment level
      newPosition.level_no = branchPos.level_no + 1;
    }

    // Navigate to the next position
    router.push(`/map/${newPosition.branch_no}/${newPosition.chapter_no}/${newPosition.level_no}`);
  };

  return (
    <GamePositionContext.Provider
      value={{
        gamePosition,
        setGamePosition,
        currBranch,
        setCurrBranch,
        incrementGamePosition,
        currentPosition,
      }}>
      {children}
    </GamePositionContext.Provider>
  );
}

export { GamePositionProvider, GamePositionContext };
