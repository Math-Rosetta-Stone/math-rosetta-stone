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

  const setGamePosition = (newPosition: GamePosition) => {
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
      const newGamePos = [...prevGamePos];
      const positionIndex = newGamePos.findIndex(
        pos => pos.branch_no === branch_no
      );
      if (positionIndex === -1) return prevGamePos;

      const newPosition = { ...newGamePos[positionIndex] };

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

      newGamePos[positionIndex] = newPosition;

      localStorage.setItem(GAME_POS_KEY, JSON.stringify(newGamePos)); // Sync to localStorage
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
