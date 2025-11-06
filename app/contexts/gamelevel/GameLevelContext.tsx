"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface GameLevelContextType {
  branchNo: number;
  chapterNo: number;
  levelNo: number;
}

const GameLevelContext = createContext<GameLevelContextType | null>(null);

export const useGameLevel = () => {
  const context = useContext(GameLevelContext);
  if (!context) {
    throw new Error("useGameLevel must be used within GameLevelProvider");
  }
  return context;
};

interface GameLevelProviderProps {
  children: ReactNode;
  branchNo: number;
  chapterNo: number;
  levelNo: number;
}

export const GameLevelProvider: React.FC<GameLevelProviderProps> = ({
  children,
  branchNo,
  chapterNo,
  levelNo,
}) => {
  return (
    <GameLevelContext.Provider value={{ branchNo, chapterNo, levelNo }}>
      {children}
    </GameLevelContext.Provider>
  );
};

