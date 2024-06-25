"use client";

import { useEffect, useState } from "react";
import { PromptType, TermItem } from "@/types/mcq";
import { cn, getOneRandom, shuffle } from "@/lib/utils";

import { Mcq } from "./_components/mcq";
import { ArrowRight } from 'lucide-react';

const TIME_LIMIT = 5; // in seconds

const mockDb: TermItem[] = [
  {
    term: "derivative",
    definition: "rate of change",
    image: {
      title: "Derivative",
      url: "/derivative.jpg",
    },
  },
  {
    term: "integral",
    definition: "area under the curve",
    image: {
      title: "Integral",
      url: "/integral.jpg",
    },
  },
  {
    term: "limit",
    definition: "approaching a value",
    image: {
      title: "Limit",
      url: "/limit.png",
    },
  },
  {
    term: "function",
    definition: "relation between inputs and outputs",
    image: {
      title: "Function",
      url: "/function.jpg",
    },
  },
  {
    term: "slope",
    definition: "steepness of a line",
    image: {
      title: "Slope",
      url: "/slope.jpg",
    },
  },
  {
    term: "tangent",
    definition: "line that touches a curve",
    image: {
      title: "Tangent",
      url: "/tangent.png",
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

  const getChoices = (question: TermItem) => {
    const wrongChoices = shuffle(mockDb.filter((item) => item.term !== question.term)).slice(0, 3);
    return shuffle([question, ...wrongChoices]);
  };
  const [currChoices, setCurrChoices] = useState<TermItem[]>(getChoices(currQuestion));

  const getGameType = () => {
    let possibleQATypes = [PromptType.TERM, PromptType.DEF, PromptType.IMG];
    const typeToRemove = getOneRandom(possibleQATypes);
    return shuffle(possibleQATypes.filter((type) => type !== typeToRemove));
  };
  const [currGameType, setCurrGameType] = useState<PromptType[]>(getGameType()); // [question type, choice type]

  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
  };

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
  };

  const handleNext = () => {
    if (availableQuestions.length === 0) {  // if no more questions, stop the game
      // to mark no more questions left
      setCurrQuestion({...currQuestion, term: ""});

      // stop the timer and set time left to 0 (purely aesthetic)
      setTimerStopped(true);
      setTimeLeft(0);
    } else {
      // get a new question from available questions
      const newQuestion = getOneRandom(availableQuestions);
      setCurrQuestion(newQuestion);

      // get new choices for the new question
      setCurrChoices(getChoices(newQuestion));

      // get new game type
      setCurrGameType(getGameType());

      // update available questions
      setAvailableQuestions(prevAvailableQuestions =>
        prevAvailableQuestions.filter((item) => item.term !== newQuestion.term)
      );

      // reset timer
      handleResetTimer();
    }

    // reset form submitted
    setFormSubmitted(false);
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
        rounded-lg shadow-md border border-neutral-200 w-1/3 pb-2"
      >
        <div
          className="flex flex-row rounded-t-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-50
          text-xl font-medium"
        >
          <div>Level #</div>
          <div>{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</div>
        </div>

        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50
          text-sm font-medium"
        >
          Match the term/definition/image corresponding to the term/definition/image.
        </div>

        {currQuestion.term !== "" ? (
          <>
            <div className="flex flex-row justify-between w-full pt-2 px-5">
              <div className="flex flex-row justify-start gap-2">
                <div>{`Round: ${mockDb.length - availableQuestions.length}/${mockDb.length}`}</div>
                <div>{`Score: ${score}`}</div>
              </div>

              <ArrowRight
                className={cn(
                  "text-slate-300 ease-in duration-150",
                  formSubmitted && currQuestion.term !== "" && "text-slate-900 hover:cursor-pointer\
                  hover:bg-slate-50"
                )}
                onClick={() => {if (formSubmitted && currQuestion.term !== "") handleNext()}}
              />
            </div>

            <Mcq
              key={availableQuestions.length % 2 === 0 ? 0 : 1} /* In order to reset selected choice state after each round */
              question={currQuestion}
              questionType={currGameType[0]}
              choices={currChoices}
              choiceType={currGameType[1]}
              handleSubmit={handleSubmit}
              formSubmitted={formSubmitted}
              updateScore={() => setScore(score + 1)}
            />
          </>) : (
            <div className="text-center text-xl font-semibold p-3">
              Congratulations! You have completed the game.
              {` You scored ${score}/${mockDb.length}`}
            </div>
        )}
      </div>
    </div>
  );
};

export default McqGame;