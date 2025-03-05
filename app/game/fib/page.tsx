"use client";

import { useContext, useEffect, useState } from "react";
import { PromptType } from "@/types/mcq";
import { cn, getOneRandom } from "@/lib/utils";

import { ArrowRight, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Fib } from "./_components/fib";

import { TermItem } from "@/types/mcq";
import { doubleAndNext } from "@/app/practice/helpers";
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders";
import { useUserData } from "@/app/hook/userdata";
import LoadingAnimation from "@/components/ui/loadinganimation";

const TIME_LIMIT = 100; // in seconds

const MOCK_DB: TermItem[] = [
  {
    term: "derivative",
    definition: "$rate$ of change",
    image: {
      title: "Derivative",
      url: "/derivative.jpg",
    },
  },
  {
    term: "derivative",
    definition: "rate of $change$",
    image: {
      title: "Derivative",
      url: "/derivative.jpg",
    },
  },
  {
    term: "integral",
    definition: "area under the $curve$",
    image: {
      title: "Integral",
      url: "/integral.jpg",
    },
  },
  {
    term: "integral",
    definition: "area $under$ the curve",
    image: {
      title: "Integral",
      url: "/integral.jpg",
    },
  },
  {
    term: "integral",
    definition: "$area$ under the curve",
    image: {
      title: "Integral",
      url: "/integral.jpg",
    },
  },
  {
    term: "limit",
    definition: "approaching a $value$",
    image: {
      title: "Limit",
      url: "/limit.png",
    },
  },
  {
    term: "limit",
    definition: "$approaching$ a value",
    image: {
      title: "Limit",
      url: "/limit.png",
    },
  },
  {
    term: "function",
    definition: "relation between $inputs$ and outputs",
    image: {
      title: "Function",
      url: "/function.jpg",
    },
  },
  {
    term: "function",
    definition: "relation between inputs and $outputs$",
    image: {
      title: "Function",
      url: "/function.jpg",
    },
  },
  {
    term: "function",
    definition: "$relation$ between inputs and outputs",
    image: {
      title: "Function",
      url: "/function.jpg",
    },
  },
  {
    term: "slope",
    definition: "steepness of a $line$",
    image: {
      title: "Slope",
      url: "/slope.jpg",
    },
  },
  {
    term: "slope",
    definition: "$steepness$ of a line",
    image: {
      title: "Slope",
      url: "/slope.jpg",
    },
  },
  {
    term: "tangent",
    definition: "line that touches a $curve$",
    image: {
      title: "Tangent",
      url: "/tangent.png",
    },
  },
  {
    term: "tangent",
    definition: "$line$ that touches a curve",
    image: {
      title: "Tangent",
      url: "/tangent.png",
    },
  },
  {
    term: "tangent",
    definition: "line that $touches$ a curve",
    image: {
      title: "Tangent",
      url: "/tangent.png",
    },
  },
];

const FibGame: React.FC = () => {
  const { gameMode, termsIndex } = useContext(PracticeModalContext);
  const mockDb =
    gameMode === "practice"
      ? MOCK_DB.filter((_, index) => doubleAndNext(termsIndex).includes(index))
      : MOCK_DB;

  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerStopped, setTimerStopped] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<TermItem>(
    getOneRandom(mockDb)
  );
  const [availableQuestions, setAvailableQuestions] = useState<TermItem[]>(
    mockDb.filter(item => item.definition !== currQuestion.definition)
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { isLoading } = useUserData();

  const getGameType = () => {
    let possibleQTypes = [PromptType.TERM, PromptType.IMG]; // answer type always the definition
    return getOneRandom(possibleQTypes);
  };
  const [currGameType, setCurrGameType] = useState<PromptType>(getGameType()); // question type

  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
  };

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
  };

  const handleNext = () => {
    if (availableQuestions.length === 0) {
      // if no more questions, stop the game
      // to mark no more questions left
      setCurrQuestion({ ...currQuestion, definition: "" });

      // stop the timer and set time left to 0 (purely aesthetic)
      setTimerStopped(true);
      setTimeLeft(0);
    } else {
      // get a new question from available questions
      const newQuestion = getOneRandom(availableQuestions);
      setCurrQuestion(newQuestion);

      // get new game type
      setCurrGameType(getGameType());

      // update available questions
      setAvailableQuestions(prevAvailableQuestions =>
        prevAvailableQuestions.filter(
          item => item.definition !== newQuestion.definition
        )
      );

      // reset timer
      handleResetTimer();
    }

    // reset form submitted
    setFormSubmitted(false);
  };

  const handleRestart = () => {
    // reset all states
    handleResetTimer();
    const newQuestion = getOneRandom(mockDb);
    setCurrQuestion(newQuestion);
    setAvailableQuestions(
      mockDb.filter(item => item.definition !== newQuestion.definition)
    );
    setFormSubmitted(false);
    setScore(0);
    setCurrGameType(getGameType());
  };

  useEffect(() => {
    setHydrated(true);
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft(prevTime => prevTime - 1);
      } else if (timeLeft === 0 && !formSubmitted && !timerStopped) {
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
    <div className="flex flex-col items-center justify-start mt-2 gap-2 min-h-screen">
      <div className="text-4xl font-black">Fill in the blanks</div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 w-1/3 pb-2">
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
          Complete the definition given the term/image.
        </div>

        {currQuestion.definition !== "" && (
          <div className="flex flex-row justify-between w-full pt-2 px-5">
            <div className="flex flex-row justify-start gap-2">
              <div>{`Round: ${mockDb.length - availableQuestions.length}/${
                mockDb.length
              }`}</div>
              <div>{`Score: ${score}`}</div>
            </div>

            <ArrowRight
              className={cn(
                "text-slate-300 ease-in duration-150",
                formSubmitted &&
                  currQuestion.definition !== "" &&
                  "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
              )}
              onClick={() => {
                if (formSubmitted && currQuestion.definition !== "")
                  handleNext();
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {currQuestion.definition !== "" ? (
            <motion.div
              key={currQuestion.definition}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              <Fib
                key={availableQuestions.length % 2 === 0 ? 0 : 1} // In order to reset selected choice state after each round
                question={currQuestion}
                questionType={currGameType}
                // answerWithBlank={currQuestion.definition}
                handleSubmit={handleSubmit}
                formSubmitted={formSubmitted}
                updateScore={() => setScore(score + 1)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center  justify-center">
              <div className="text-center text-xl font-semibold p-3">
                Congratulations! You have completed the game.
                {` You scored ${score}/${mockDb.length}`}
              </div>

              <Button
                className="border hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300
                ease-in duration-150 disabled:bg-slate-300 disabled:text-slate-900"
                variant="default"
                onClick={handleRestart}>
                <RotateCcw className="mr-2" />
                Restart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FibGame;
