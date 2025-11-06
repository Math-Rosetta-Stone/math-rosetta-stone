"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useContext, useState } from "react";
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders";
import { GAMES } from "../map/_constants/constants";

const PracticeRedirectPage = () => {
  const [message, setMessage] = useState<string>("Redirecting...");
  const { gameMode, gamesIndex, setGamesIndex } =
    useContext(PracticeModalContext);
  const router = useRouter();

  const handlePop = useCallback(() => {
    const copyGamesIndex = [...gamesIndex];
    const currGameIndex = copyGamesIndex.pop();
    setGamesIndex(copyGamesIndex);
    return currGameIndex;
  }, [gamesIndex, setGamesIndex]);

  useEffect(() => {
    const currGameIndex = handlePop();
    if (gameMode === "regular" || currGameIndex === undefined) {
      setMessage("No more games left. Redirecting to select games...");
      router.push("/map");
      return;
    }
    router.push(`/practice/${GAMES[currGameIndex]}`);
  }, [gameMode, handlePop, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
    </div>
  );
};

export default PracticeRedirectPage;
