"use client";

import { shuffle } from "@/lib/utils";
import { Matching } from "./_components/matching";
import { useEffect, useState } from "react";

const timeLimit = 20; // 20 seconds

const termToDefinition: {[key: string]: string} = {
  "derivative": "rate of change",
  "integral": "area under the curve",
  "limit": "approaching a value",
  "function": "relation between inputs and outputs",
};

const MatchingGame = () => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerStopped, setTimerStopped] = useState(false);
  const [randomizedTerms, setRandomizedTerms] = useState<string[]>(shuffle(Object.keys(termToDefinition)));
  const [randomizedDefinitions, setRandomizedDefinitions] = useState<string[]>(shuffle(Object.values(termToDefinition)));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
  };

  const handleResetTimer = () => {
    setTimeLeft(timeLimit);
    setTimerStopped(false);
    setFormSubmitted(false);
  };

  const handleShuffle = (shuffledTerms: string[], shuffledDefinitions: string[]) => {
    setRandomizedTerms(shuffledTerms);
    setRandomizedDefinitions(shuffledDefinitions);
  };

  useEffect(() => {
    setHydrated(true);
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else if (timeLeft === 0 && !formSubmitted) {
        handleSubmit(); // Automatically submit when the timer reaches 0
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStopped, timeLeft]);

  if (!hydrated) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-around min-h-screen">

      <div className="text-4xl font-black">
        Matching Game
      </div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 pb-5"
      >
        <div
          className="flex flex-row rounded-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-50
          text-xl font-medium"
        >
          <div>Level #</div>
          <div>{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</div>
        </div>

        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50
          text-sm"
        >
          Match the terms to their definitions
        </div>

        <Matching
          terms={randomizedTerms}
          definitions={randomizedDefinitions}
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