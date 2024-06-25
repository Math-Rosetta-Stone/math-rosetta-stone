"use client";

import { useEffect, useState } from "react";
import { PromptType, TermItem } from "@/types/mcq";
import { getOneRandom, shuffle } from "@/lib/utils";

import { Mcq } from "./_components/mcq";

const TIME_LIMIT = 20; // 20 seconds

const mockDb: TermItem[] = [
  {
    term: "derivative",
    definition: "rate of change",
    image: {
      title: "Derivative",
      url: "/images/derivative.png",
    },
  },
  {
    term: "integral",
    definition: "area under the curve",
    image: {
      title: "Integral",
      url: "/images/integral.png",
    },
  },
  //give me 6 more such objects
  {
    term: "limit",
    definition: "approaching a value",
    image: {
      title: "Limit",
      url: "/images/limit.png",
    },
  },
  {
    term: "function",
    definition: "relation between inputs and outputs",
    image: {
      title: "Function",
      url: "/images/function.png",
    },
  },
  {
    term: "slope",
    definition: "steepness of a line",
    image: {
      title: "Slope",
      url: "/images/slope.png",
    },
  },
  {
    term: "tangent",
    definition: "line that touches a curve",
    image: {
      title: "Tangent",
      url: "/images/tangent.png",
    },
  },
  {
    term: "normal",
    definition: "line perpendicular to a tangent",
    image: {
      title: "Normal",
      url: "/images/normal.png",
    },
  },
];

const McqGame = () => {
  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerStopped, setTimerStopped] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<TermItem>(getOneRandom(mockDb));
  const [availableQuestions, setAvailableQuestions] = useState<TermItem[]>(mockDb.filter((item) => item.term !== currQuestion.term));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Returns array of random choices including the correct answer
  const getChoices = () => {
    const wrongChoices = shuffle(mockDb.filter((item) => item.term !== currQuestion.term)).slice(0, 3);
    return shuffle([currQuestion, ...wrongChoices]);
  };
  const [currChoices, setCurrChoices] = useState<TermItem[]>(getChoices()); // [choice1, choice2, choice3, choice4

  // Returns array [question type, choice type]
  const getGameType = () => {
    // let possibleQATypes = [PromptType.TERM, PromptType.DEF, PromptType.IMG];
    // const typeToRemove = getOneRandom([PromptType.TERM, PromptType.DEF, PromptType.IMG]);
    // return possibleQATypes.filter((type) => type !== typeToRemove);
    return shuffle([PromptType.TERM, PromptType.DEF]);
  };
  const [currGameType, setCurrGameType] = useState<PromptType[]>(getGameType()); // [question type, choice type]


  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
    // delay of 2 seconds before shuffling
    setTimeout(() => {
      handleShuffle();
      setFormSubmitted(false);
    }, 2000);
  };

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
  };

  const handleShuffle = () => {
    if (availableQuestions.length === 0) {
      // setAvailableQuestions(mockDb);
      return;
    }
    setCurrQuestion(getOneRandom(availableQuestions));
    setAvailableQuestions(availableQuestions.filter((item) => item.term !== currQuestion.term));
    setCurrChoices(getChoices());
    setCurrGameType(getGameType());
    handleResetTimer();
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
    <div className="flex flex-col items-center justify-start mt-2 gap-2 min-h-screen">

      <div className="text-4xl font-black">
        MCQ Game
      </div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 pb-5 w-1/3"
      >
        <div
          className="flex flex-row rounded-t-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-50
          text-xl font-medium"
        >
          <div>Level #</div>
          <div>{`${mockDb.length - availableQuestions.length}/${mockDb.length}`}</div>
          <div>{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</div>
        </div>

        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50
          text-sm font-medium"
        >
          Match the term/definition/image corresponding to the term/definition/image.
        </div>

        {availableQuestions.length > 0 ? (
          <Mcq
            question={currQuestion}
            questionType={currGameType[0]}
            choices={currChoices}
            choiceType={currGameType[1]}
            handleSubmit={handleSubmit}
            formSubmitted={formSubmitted}
            updateScore={() => setScore(score + 1)}
          />) : (
            <div className="text-center text-xl font-semibold p-3">
              Congratulations! You have completed the game.
              {` Your score is ${score}/${mockDb.length}`}
            </div>
        )}
      </div>
    </div>
  );
};

export default McqGame;