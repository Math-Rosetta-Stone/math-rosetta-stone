"use client";

import { useEffect, useState, useContext } from "react";
import { TermItem, MOCK_DB } from "@/app/map/constants/constants";
import { cn, getOneRandom } from "@/lib/utils";

import { ArrowRight, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders";
import { useUserData } from "@/app/hooks/userdata";
import LoadingAnimation from "@/components/ui/loadinganimation";
import NextButton from "../_components/next-button";
import { useTerms } from "@/app/hooks/useTerms";

const TIME_LIMIT = 10; // in seconds

const LogoQuizGame = () => {
  const { data: termItems, isPending } = useTerms();

  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timerStopped, setTimerStopped] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<TermItem>(
    getOneRandom(termItems)
  );
  const [availableQuestions, setAvailableQuestions] = useState<TermItem[]>(
    termItems.filter(item => item.term !== currQuestion.term)
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [inputColor, setInputColor] = useState<string>("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<string>("");

  const { isLoading } = useUserData();

  const handleSubmit = () => {
    setTimerStopped(true);
    setFormSubmitted(true);
    if (
      userAnswer.trim().toLowerCase() === currQuestion.term.trim().toLowerCase()
    ) {
      setScore(score + 1);
      setInputColor("green");
      setShowCorrectAnswer("");
    } else {
      setInputColor("red");
      setShowCorrectAnswer(currQuestion.term);
    }
  };

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setTimerStopped(false);
    setInputColor("");
    setShowCorrectAnswer("");
  };

  const handleNext = () => {
    if (availableQuestions.length === 0) {
      // if no more questions, stop the game
      // to mark no more questions left
      setCurrQuestion({ ...currQuestion, term: "" });

      // stop the timer and set time left to 0 (purely aesthetic)
      setTimerStopped(true);
      setTimeLeft(0);
    } else {
      // get a new question from available questions
      const newQuestion = getOneRandom(availableQuestions);
      setCurrQuestion(newQuestion);

      // update available questions
      setAvailableQuestions(prevAvailableQuestions =>
        prevAvailableQuestions.filter(item => item.term !== newQuestion.term)
      );

      // reset timer
      handleResetTimer();
    }

    // reset form submitted
    setFormSubmitted(false);
    // reset user answer
    setUserAnswer("");
  };

  const handleRestart = () => {
    // reset all states
    handleResetTimer();
    const newQuestion = getOneRandom(termItems);
    setCurrQuestion(newQuestion);
    setAvailableQuestions(
      termItems.filter(item => item.term !== newQuestion.term)
    );
    setFormSubmitted(false);
    setScore(0);
    setUserAnswer("");
  };

  useEffect(() => {
    setHydrated(true);
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft(prevTime => prevTime - 1);
      } else if (timeLeft === 0 && !formSubmitted && !timerStopped) {
        handleSubmit(); // Automatically submit when the timer reaches 0
        setInputColor("orange");
        setShowCorrectAnswer(currQuestion.term);
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
      <div className="text-4xl font-black">Logo Quiz Game</div>

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
          py-2 px-3 bg-slate-100
          text-sm font-medium">
          Identify the term corresponding to the image.
        </div>

        {currQuestion.term !== "" && (
          <div className="flex flex-row justify-between w-full pt-2 px-5">
            <div className="flex flex-row justify-start gap-2">
              <div>{`Round: ${termItems.length - availableQuestions.length}/${
                termItems.length
              }`}</div>
              <div>{`Score: ${score}`}</div>
            </div>

            <ArrowRight
              className={cn(
                "text-slate-300 ease-in duration-150",
                formSubmitted &&
                  currQuestion.term !== "" &&
                  "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
              )}
              onClick={() => {
                if (formSubmitted && currQuestion.term !== "") handleNext();
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {currQuestion.term !== "" ? (
            <motion.div
              key={currQuestion.term}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              <div className="flex flex-col items-center justify-center w-full p-5">
                <div className="flex flex-col items-center justify-center w-full">
                  <img
                    src={currQuestion.image.url}
                    alt={currQuestion.image.title}
                    className="w-1/2 h-auto"
                  />
                </div>
                <div className="mt-5 w-full">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg",
                      inputColor === "red" && "border-red-500",
                      inputColor === "green" && "border-green-500",
                      inputColor === "orange" && "border-orange-500"
                    )}
                    placeholder="Type your answer here"
                  />
                </div>
                {formSubmitted && showCorrectAnswer && (
                  <div
                    className={cn(
                      "mt-2",
                      inputColor === "red" && "text-red-500",
                      inputColor === "orange" && "text-orange-500"
                    )}>
                    Correct Answer: {showCorrectAnswer}
                  </div>
                )}
                <Button
                  className="mt-5"
                  variant="default"
                  onClick={handleSubmit}
                  disabled={formSubmitted}>
                  Submit
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center">
              <div className="text-center text-xl font-semibold p-3">
                Congratulations! You have completed the game.
                {` You scored ${score}/${termItems.length}`}
              </div>
              <Button
                className="border hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300
                ease-in duration-150 disabled:bg-slate-300 disabled:text-slate-900"
                variant="default"
                onClick={handleRestart}>
                <RotateCcw className="mr-2" />
                Restart
              </Button>

              <NextButton />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LogoQuizGame;
