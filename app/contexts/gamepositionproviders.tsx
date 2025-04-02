"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { GamePosition } from "@/types/map";
import { useGameData } from "@/app/hooks/useGameData";
import { incrementGamePositionHelper } from "../map/helpers/gamePositionHelpers";

interface GamePositionContextProps {
  gamePosition: GamePosition[];
  setGamePosition: (
    position: Partial<GamePosition> & { branch_no: number }
  ) => void;
  incrementGamePosition: (branch_no: number) => void;
  currBranch: number;
  setCurrBranch: Dispatch<SetStateAction<number>>;
}

const GAME_POS_KEY = "game_position";
const CUR_BRANCH_KEY = "curr_branch";

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

// Retrieve initial state from localStorage or use default
const getInitialGamePosition = (): GamePosition[] => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(GAME_POS_KEY);
    return storedData ? JSON.parse(storedData) : INITIAL_GAME_POSITION;
  }
  return INITIAL_GAME_POSITION;
};

// Retrieve initial current branch from localStorage or use default
const getInitialCurrBranch = (): number => {
  if (typeof window !== "undefined") {
    const storedBranch = localStorage.getItem(CUR_BRANCH_KEY);
    return storedBranch ? JSON.parse(storedBranch) : 0;
  }
  return 0;
};

const GamePositionContext = createContext<GamePositionContextProps>({
  gamePosition: [],
  setGamePosition: () => {},
  incrementGamePosition: () => {},
  currBranch: 0,
  setCurrBranch: () => {},
});

function GamePositionProvider({ children }: { children: ReactNode }) {
  const [gamePosition, setGamePositionState] = useState<GamePosition[]>(
    getInitialGamePosition
  );
  const [currBranch, setCurrBranch] = useState<number>(getInitialCurrBranch);
  const { branches, chapters } = useGameData();

  // Sync state to localStorage whenever gamePosition changes
  useEffect(() => {
    localStorage.setItem(GAME_POS_KEY, JSON.stringify(gamePosition));
  }, [gamePosition]);

  // Sync state to localStorage whenever currBranch changes
  useEffect(() => {
    localStorage.setItem(CUR_BRANCH_KEY, JSON.stringify(currBranch));
  }, [currBranch]);

  const setGamePosition = (newPosition: Partial<GamePosition>) => {
    setGamePositionState(prev =>
      prev.map(pos =>
        pos.branch_no === newPosition.branch_no
          ? { ...pos, ...newPosition }
          : pos
      )
    );
  };

  const incrementGamePosition = (branch_no: number) => {
    setGamePositionState(prevGamePos => {
      const newGamePos = incrementGamePositionHelper(
        prevGamePos,
        branch_no,
        branches,
        chapters
      );
      console.log("newGamePos", newGamePos);
      localStorage.setItem(GAME_POS_KEY, JSON.stringify(newGamePos));
      return newGamePos;
    });
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
