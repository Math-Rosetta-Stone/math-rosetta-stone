"use client";

import { useEffect, useState } from "react";
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

  const getParsedDefinition = () => {
    const words = question.definition.split(" ");

    // Assume definition doesn't contain period at the end
    for (let i = 0; i < words.length; i++) {
      if (words[i][0] == "$" && words[i][words[i].length - 1] == "$") {
        setBeforeBlank(words.slice(0, i).join(" "));
        setAfterBlank(words.slice(i + 1).join(" "));
        setCorrectAnswer(words[i].slice(1, words[i].length - 1));
        return;
      }
    }
  };

  const handleFill = () => {
    if (filledAnswer.toLowerCase() === correctAnswer.toLowerCase()) updateScore();

    handleSubmit();
  };

  useEffect(() => {
    getParsedDefinition();
  });

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
        </span>: {beforeBlank}

        <BlankInput
          value={filledAnswer}
          onChange={(e) => setFilledAnswer(e.target.value)}
          variant={formSubmitted ? "submitted" : "unsubmitted"}
        />

        {afterBlank}.
      </div>

      {formSubmitted && (
        <Response
          correctAnswer={beforeBlank.charAt(0).toUpperCase() + beforeBlank.slice(1) + " " + correctAnswer + " " + afterBlank + "."}
          variant={filledAnswer.length > 0 ? (
            filledAnswer.toLowerCase() === correctAnswer.toLowerCase() ? ("correct") : ("incorrect")
          ) : (
            "timeout"
          )}
        />
      )}

      <Button
        className="border hover:bg-slate-100 hover:text-slate-900
        hover:border-slate-300 ease-in duration-150
        disabled:bg-slate-300 disabled:text-slate-900"
        disabled={formSubmitted || filledAnswer.length <= 0}
        variant="default"
        onClick={handleFill}
      >
        Submit
      </Button>
    </div>
  );
};