"use client";

import { useEffect, useState, useContext } from "react";
import { shuffle } from "@/lib/utils";
import { withAuth } from "@/lib/withAuth";

import { Matching } from "./_components/matching";

import { termItemToRecord } from "@/app/practice/helpers";
import { MOCK_DB } from "@/app/map/constants/constants";
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders";
import LoadingAnimation from "@/components/ui/loadinganimation";
import { useUserData } from "@/app/hook/userdata";

const TIME_LIMIT = 30; // in seconds

// const termToDefinition: { [key: string]: string } = {
//   derivative: "rate of change",
//   integral: "area under the curve",
//   limit: "approaching a value",
//   function: "relation between inputs and outputs",
// }

const MatchingGame = () => {
  const { gameMode, termsIndex } = useContext(PracticeModalContext);
  const termToDefinition =
    gameMode === "regular"
      ? termItemToRecord(MOCK_DB)
      : termItemToRecord(
          MOCK_DB.filter((_, index) => termsIndex.includes(index))
        );

  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerStopped, setTimerStopped] = useState(false);
  const [randomizedTerms, setRandomizedTerms] = useState<string[]>(
    shuffle(Object.keys(termToDefinition))
  );
  const [randomizedDefinitions, setRandomizedDefinitions] = useState<string[]>(
    shuffle(Object.values(termToDefinition))
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { isLoading } = useUserData();

  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
  };

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
    setFormSubmitted(false);
  };

  const handleShuffle = (
    shuffledTerms: string[],
    shuffledDefinitions: string[]
  ) => {
    setRandomizedTerms(shuffledTerms);
    setRandomizedDefinitions(shuffledDefinitions);
  };

  useEffect(() => {
    setHydrated(true);
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft(prevTime => prevTime - 1);
      } else if (timeLeft === 0 && !formSubmitted) {
        handleSubmit(); // Automatically submit when the timer reaches 0
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStopped, timeLeft]);

  if (!hydrated) {
    return null;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col items-center justify-start gap-2 min-h-screen mt-[8vh]">
      <div className="text-4xl font-black">Matching Game</div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 pb-5">
        <div
          className="flex flex-row rounded-t-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-100
          text-xl font-medium">
          <div>Level #</div>
          <div>{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</div>
        </div>

        <div
          className="flex flex-row justify-between w-full
          border-b border-neutral-100 py-2 px-3 bg-slate-100
          text-sm font-medium">
          Match the terms to their definitions.
        </div>

        <Matching
          questions={randomizedTerms}
          answers={randomizedDefinitions}
          answerKey={termToDefinition}
          handleResetTimer={handleResetTimer}
          handleSubmit={handleSubmit}
          handleShuffle={handleShuffle}
          formSubmitted={formSubmitted}
        />
      </div>
    </div>
  );
};

export default MatchingGame;
