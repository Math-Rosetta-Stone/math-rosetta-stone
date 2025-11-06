"use client";

import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { GameLevelProvider } from "@/app/contexts/gamelevel/GameLevelContext";
import { useTermsForLevel } from "@/app/hooks/useTermsForLevel";

// Dynamically import all game components
const McqGame = dynamic(() => import("@/app/game/mcq/game"), { ssr: false });
const HangmanGame = dynamic(() => import("@/app/game/hangman/game"), { ssr: false });
const MatchingGame = dynamic(() => import("@/app/game/matching/game"), { ssr: false });
const LogoGame = dynamic(() => import("@/app/game/logo/game"), { ssr: false });
const FibGame = dynamic(() => import("@/app/game/fib/game"), { ssr: false });
const ListenGame = dynamic(() => import("@/app/game/listen/game"), { ssr: false });

interface GameRendererProps {
  gameType: string;
  branchNo: number;
  chapterNo: number;
  levelNo: number;
}

const GameRenderer: React.FC<GameRendererProps> = ({
  gameType,
  branchNo,
  chapterNo,
  levelNo,
}) => {
  const router = useRouter();
  const { data: termItems } = useTermsForLevel({ branchNo, chapterNo, levelNo });
  console.log(termItems);
  const renderGame = () => {
    switch (gameType) {
      case "mcq":
        return <McqGame termItems={termItems} />;
      case "hangman":
        return <HangmanGame termItems={termItems} />;
      case "matching":
        return <MatchingGame termItems={termItems} />;
      case "logo":
        return <LogoGame termItems={termItems} />;
      case "fib":
        return <FibGame termItems={termItems} />;
      case "listen":
        return <ListenGame termItems={termItems} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-2xl font-bold text-red-600 mb-4">
              Unknown game type: {gameType}
            </div>
            <button
              onClick={() => router.push(`/map`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Go to Map
            </button>
          </div>
        );
    }
  };

  return (
    <GameLevelProvider branchNo={branchNo} chapterNo={chapterNo} levelNo={levelNo}>
      {renderGame()}
    </GameLevelProvider>
  );
};

export default GameRenderer;

