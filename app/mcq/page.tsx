"use client";

import { useEffect, useState } from "react";

import { Mcq } from "./_components/mcq";

const TIME_LIMIT = 20; // 20 seconds

const termToDefinitionAndImage: {[key: string]: {}} = {
  "derivative": {
    definition: "rate of change",
    image: "",
  },
  "integral": {
    definition: "area under the curve",
    image: "",
  },
  "limit": {
    definition: "approaching a value",
    image: "",
  },
  "function": {
    definition: "relation between inputs and outputs",
    image: "",
  },
};

const McqGame = () => {
  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerStopped, setTimerStopped] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
  };

  useEffect(() => {
    setHydrated(true);
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft((prevTime) => prevTime - 1);
      } /* else if (timeLeft === 0 && !formSubmitted) {
        handleSubmit(); // Automatically submit when the timer reaches 0
      } */
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStopped, timeLeft]);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">

      <div className="text-4xl font-black">
        MCQ Game
      </div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 pb-5 w-1/3"
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
          Match the term/definition/image corresponding to the term/definition/image.
        </div>

        <Mcq />

      </div>
    </div>
  );
};

export default McqGame;