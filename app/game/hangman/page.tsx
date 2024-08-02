"use client";

import React, { useState, useEffect, KeyboardEvent } from 'react';
import Figure from './_components/Figure';
import WrongLetters from './_components/WrongLetters';
import Word from './_components/Word';
import Notification from './_components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import { TermItem } from "@/types/mcq";
import { cn, getOneRandom } from "@/lib/utils";
import { ArrowRight, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import './hangman.css';
import { useRouter } from 'next/navigation';

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

const Hangman: React.FC = () => {
  const [playable, setPlayable] = useState<boolean>(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<TermItem>(getOneRandom(mockDb));
  const [availableQuestions, setAvailableQuestions] = useState<TermItem[]>(mockDb.filter((item) => item.term !== currQuestion.term));
  const [score, setScore] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameMessage, setGameMessage] = useState<string>('');

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleNext = () => {
    if (availableQuestions.length === 0) {  // if no more questions, stop the game
      // to mark no more questions left
      setCurrQuestion({ ...currQuestion, term: "" });
      setCorrectLetters([]);
      setWrongLetters([]);
      setPlayable(true);
    } else {
      // get a new question from available questions
      const newQuestion = getOneRandom(availableQuestions);
      setCurrQuestion(newQuestion);

      // update available questions
      setAvailableQuestions(prevAvailableQuestions =>
        prevAvailableQuestions.filter((item) => item.term !== newQuestion.term)
      );
      setFormSubmitted(false);
      setGameMessage('');
      setCorrectLetters([]);
      setWrongLetters([]);
      setPlayable(true);
    }
  };

  const handleRestart = () => {
    setPlayable(true);
    setFormSubmitted(false);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    // reset all states
    const newQuestion = getOneRandom(mockDb);
    setCurrQuestion(newQuestion);
    setAvailableQuestions(mockDb.filter((item) => item.term !== newQuestion.term));
    setScore(0);
    setGameMessage('');
  };

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (res.status === 401) {
          return router.push("/");
        } else if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        setIsLoading(false);
        return res.json()
      });
  }, []);

  useEffect(() => {
    setHydrated(true);
    const handleKeydown = (event: KeyboardEvent) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (currQuestion.term.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown as unknown as EventListener);

    return () => window.removeEventListener('keydown', handleKeydown as unknown as EventListener);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    const result = checkWin(correctLetters, wrongLetters, currQuestion.term);
    if (result === 'win') {
      setPlayable(false);
      setFormSubmitted(true);
      setScore(score + 1);
      setGameMessage('Congratulations! You won! 😃');
    } else if (result === 'lose') {
      setPlayable(false);
      setFormSubmitted(true);
      setGameMessage(`Unfortunately you lost. 😕 The word was: ${currQuestion.term}`);
    }
  }, [correctLetters, wrongLetters, currQuestion.term]);

  if (!hydrated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start mt-2 gap-2 min-h-screen">
      <div className="text-4xl font-black">
        Hangman
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
        </div>
        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50
          text-sm font-medium"
        >
          Identify the term corresponding to the definition.
        </div>
        {currQuestion.term !== "" && (
          <div className="flex flex-row justify-between w-full pt-2 px-5">
            <div className="flex flex-row justify-start gap-2">
              <div>{`Round: ${mockDb.length - availableQuestions.length}/${mockDb.length}`}</div>
              <div>{`Score: ${score}`}</div>
            </div>

            <ArrowRight
              className={cn(
                "text-slate-300 ease-in duration-150",
                formSubmitted && currQuestion.term !== "" && "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
              )}
              onClick={() => { if (formSubmitted && currQuestion.term !== "") handleNext() }}
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
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center w-full p-5">
                <p>Definition: {currQuestion.definition}</p>
                <div className="mt-5 w-full game-container">
                    <Figure wrongLetters={wrongLetters} />
                    <WrongLetters wrongLetters={wrongLetters} />
                    <Word selectedWord={currQuestion.term} correctLetters={correctLetters} />
                </div>
                {formSubmitted && gameMessage && currQuestion.term !== "" && (
                  <div>
                    {gameMessage}
                  </div>
                )}
                <Notification showNotification={showNotification} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-center text-xl font-semibold p-3">
                Congratulations! You have completed the game.
                {` You scored ${score-1}/${mockDb.length}`}
              </div>

              <Button
                className="border hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 ease-in duration-150 disabled:bg-slate-300 disabled:text-slate-900"
                variant="default"
                onClick={handleRestart}
              >
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

export default Hangman;
