"use client";

import { useEffect, useState, useMemo } from "react";
import { PromptType, TermItem } from "@/types/game";

import { BlankInput } from "./blank-input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Response } from "./response";

interface FibProps {
  question: TermItem;
  questionType: PromptType;
  // answerWithBlank: string;
  handleSubmit: () => void;
  formSubmitted: boolean;
  updateScore: () => void;
}

export const Fib = ({
  question,
  questionType,
  // answerWithBlank,
  handleSubmit,
  formSubmitted,
  updateScore,
}: FibProps) => {
  const [filledAnswer, setFilledAnswer] = useState<string>("");
  const [beforeBlank, setBeforeBlank] = useState<string>("");
  const [afterBlank, setAfterBlank] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [correctAnswerWithPunct, setCorrectAnswerWithPunct] = useState<string>("");

  const getQuestionContent = () => {
    switch (questionType) {
      case PromptType.TERM:
        return question.term;
      case PromptType.IMG:
        return (
          <Image
            src={question.image.url}
            alt={question.image.title}
            height={120} width={120}
          />
        );
      default:
        return null;
    }
  };

  // Parse definition into words and randomly select one to blank out
  const parsedDefinition = useMemo(() => {
    if (!question.definition) return null;
    
    // Split definition into words, preserving punctuation
    // Split by spaces but keep punctuation attached to words
    const words = question.definition.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 0) return null;
    
    // Randomly select one word index to blank out
    const blankIndex = Math.floor(Math.random() * words.length);
    const selectedWordWithPunct = words[blankIndex];
    
    // Remove punctuation from the selected word for comparison
    // This allows players to answer without worrying about punctuation
    const cleanWord = selectedWordWithPunct.replace(/[.,!?;:]/g, '').trim();
    
    return {
      words,
      blankIndex,
      selectedWord: cleanWord,
      selectedWordWithPunct, // Keep original for display context
      beforeWords: words.slice(0, blankIndex),
      afterWords: words.slice(blankIndex + 1),
    };
  }, [question.definition]);

  useEffect(() => {
    if (parsedDefinition) {
      setBeforeBlank(parsedDefinition.beforeWords.join(" "));
      setAfterBlank(parsedDefinition.afterWords.join(" "));
      setCorrectAnswer(parsedDefinition.selectedWord);
      setCorrectAnswerWithPunct(parsedDefinition.selectedWordWithPunct);
      setFilledAnswer(""); // Reset answer when question changes
    }
  }, [parsedDefinition]);

  const handleFill = () => {
    // Trim whitespace and compare case-insensitively
    const userAnswer = filledAnswer.trim().toLowerCase();
    const correct = correctAnswer.trim().toLowerCase();
    
    if (userAnswer === correct) {
      updateScore();
    }

    handleSubmit();
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div
        className="rounded shadow-sm border border-neutral-300 p-3
        w-full text-wrap
        text-base font-normal"
      >
        <div className="mb-1">
          <span className="font-semibold underline underline-offset-2">
            {questionType === PromptType.TERM ? "Term" : "Image"}
          </span>: {getQuestionContent()}
        </div>


        <span className="font-semibold underline underline-offset-2">
          Definition
        </span>: {beforeBlank ? `${beforeBlank} ` : ''}

        <BlankInput
          value={filledAnswer}
          onChange={(e) => setFilledAnswer(e.target.value)}
          variant={formSubmitted ? "submitted" : "unsubmitted"}
        />

        {afterBlank ? ` ${afterBlank}` : ''}
      </div>

      {formSubmitted && (
        <Response
          correctAnswer={[
            ...(beforeBlank ? [beforeBlank] : []),
            correctAnswerWithPunct,
            ...(afterBlank ? [afterBlank] : [])
          ].join(" ")}
          variant={filledAnswer.trim().length > 0 ? (
            filledAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? ("correct") : ("incorrect")
          ) : (
            "timeout"
          )}
        />
      )}

      <Button
        className="border hover:bg-slate-100 hover:text-slate-900
        hover:border-slate-300 ease-in duration-150
        disabled:bg-slate-300 disabled:text-slate-900"
        disabled={formSubmitted || filledAnswer.trim().length <= 0}
        variant="default"
        onClick={handleFill}
      >
        Submit
      </Button>
    </div>
  );
};