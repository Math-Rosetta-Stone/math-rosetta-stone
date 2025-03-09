"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { GamePosition } from "@/types/db";
import { useGameData } from "@/app/hooks/useGameData";

interface GamePositionContextProps {
  gamePosition: GamePosition[];
  setGamePosition: (position: GamePosition) => void;
  incrementGamePosition: (branch_no: number) => void;
  currBranch: number;
  setCurrBranch: Dispatch<SetStateAction<number>>;
}

const INITIAL_GAME_POSITION: GamePosition[] = [
  {
    branch_no: 0,
    chapter_no: 0,
    level_no: 0,
  },
  {
    branch_no: 1,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 2,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 3,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 4,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 5,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 6,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 7,
    chapter_no: 1,
    level_no: 1,
  },
];
// Provide a no-op default function for setGamePosition to avoid errors
const GamePositionContext = createContext<GamePositionContextProps>({
  gamePosition: [],
  setGamePosition: () => {},
  incrementGamePosition: () => {},
  currBranch: 0,
  setCurrBranch: () => {},
});

function GamePositionProvider({ children }: { children: ReactNode }) {
  const [gamePosition, setGamePositionState] = useState<GamePosition[]>(
    INITIAL_GAME_POSITION
  );
  const [currBranch, setCurrBranch] = useState<number>(0);
  const { branches, chapters } = useGameData();

  const setGamePosition = (newPosition: GamePosition) => {
    setGamePositionState(prev =>
      prev.map(pos =>
        pos.branch_no === newPosition.branch_no ? newPosition : pos
      )
    );
  };

  const incrementGamePosition = (branch_no: number) => {
    const newPosition = gamePosition[branch_no];
    const isLastChapter =
      branches?.[newPosition.branch_no]?.no_of_chapters ===
      newPosition.chapter_no;
    const isLastLevel =
      chapters?.[newPosition.chapter_no]?.no_of_minigames ===
      newPosition.level_no;
    newPosition.level_no =
      isLastLevel && !isLastChapter ? 1 : newPosition.level_no + 1;
    newPosition.chapter_no =
      isLastLevel && !isLastChapter ? 1 : newPosition.chapter_no + 1;

    setGamePosition(newPosition);
  };

  return (
    <GamePositionContext.Provider
      value={{
        gamePosition,
        setGamePosition,
        currBranch,
        setCurrBranch,
        incrementGamePosition,
      }}>
      {children}
    </GamePositionContext.Provider>
  );
}

export { GamePositionProvider, GamePositionContext };
