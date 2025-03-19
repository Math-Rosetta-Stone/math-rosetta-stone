"use client";

// original hangman code with a little props modifications for incorporate the gameMode prop
// only touched the props and added logic for choosing mockDb
import React, { useState, useEffect, KeyboardEvent, useContext } from "react";
import Figure from "./_components/Figure";
import WrongLetters from "./_components/WrongLetters";
import Word from "./_components/Word";
import Notification from "./_components/Notification";
import { showNotification as show, checkWin } from "./helpers/helpers";
import { cn, getOneRandom } from "@/lib/utils";
import { ArrowRight, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MOCK_DB } from "@/app/map/constants/constants";
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders";

import "./hangman.css";
import { useUserData } from "@/app/hooks/userdata";
import LoadingAnimation from "@/components/ui/loadinganimation";
import NextButton from "../_components/next-button";
import { useTerms } from "@/app/hooks/useTerms";
import { TermItem } from "@/types/game";

const Hangman: React.FC = () => {
  const { data: termItems, isPending } = useTerms();

  const [playable, setPlayable] = useState<boolean>(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<TermItem>(
    getOneRandom(termItems)
  );

  const [availableQuestions, setAvailableQuestions] = useState<TermItem[]>(
    termItems.filter(item => item.term !== currQuestion.term)
  );
  const [score, setScore] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameMessage, setGameMessage] = useState<string>("");

  const { isLoading } = useUserData();

  const handleNext = () => {
    if (availableQuestions.length === 0) {
      // if no more questions, stop the game
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
        prevAvailableQuestions.filter(item => item.term !== newQuestion.term)
      );
      setFormSubmitted(false);
      setGameMessage("");
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
    const newQuestion = getOneRandom(termItems);
    setCurrQuestion(newQuestion);
    setAvailableQuestions(
      termItems.filter(item => item.term !== newQuestion.term)
    );
    setScore(0);
    setGameMessage("");
  };

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
    window.addEventListener(
      "keydown",
      handleKeydown as unknown as EventListener
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeydown as unknown as EventListener
      );
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    const result = checkWin(correctLetters, wrongLetters, currQuestion.term);
    if (result === "win") {
      setPlayable(false);
      setFormSubmitted(true);
      setScore(score + 1);
      setGameMessage("Congratulations! You won! 😃");
    } else if (result === "lose") {
      setPlayable(false);
      setFormSubmitted(true);
      setGameMessage(
        `Unfortunately you lost. 😕 The word was: ${currQuestion.term}`
      );
    }
  }, [correctLetters, wrongLetters, currQuestion.term]);

  if (!hydrated) {
    return null;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col items-center justify-start mt-2 gap-2 min-h-screen">
      <div className="text-4xl font-black">Hangman</div>
      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 w-1/3 pb-2">
        <div
          className="flex flex-row rounded-t-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-50
          text-xl font-medium">
          <div>Level #</div>
        </div>
        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50
          text-sm font-medium">
          Identify the term corresponding to the definition.
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
                <p>Definition: {currQuestion.definition}</p>
                <div className="mt-5 w-full game-container">
                  <Figure wrongLetters={wrongLetters} />
                  <WrongLetters wrongLetters={wrongLetters} />
                  <Word
                    selectedWord={currQuestion.term}
                    correctLetters={correctLetters}
                  />
                </div>
                {formSubmitted && gameMessage && currQuestion.term !== "" && (
                  <div>{gameMessage}</div>
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
              className="flex flex-col items-center justify-center">
              <div className="text-center text-xl font-semibold p-3">
                Congratulations! You have completed the game.
                {` You scored ${score - 1}/${termItems.length}`}
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

export default Hangman;
