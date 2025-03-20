"use client";

import { useState } from "react";
import { PromptType, TermItem } from "@/types/game";

import { QuestionBox } from "./question-box";
import { ChoiceBox } from "./choice-box";

interface McqProps {
  question: TermItem;
  questionType: PromptType;
  choices: TermItem[];
  choiceType: PromptType;
  handleSubmit: () => void;
  formSubmitted: boolean;
  updateScore: () => void;
}

export const Mcq = ({
  question,
  questionType,
  choices,
  choiceType,
  handleSubmit,
  formSubmitted,
  updateScore,
}: McqProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const select = (index: number) => {
    setSelectedChoice(index);

    if (isCorrectChoice(choices[index])) updateScore();

    handleSubmit();
  };

  const isCorrectChoice = (choice: TermItem) => {
    let correctChoice = "";
    let chosenChoice = "";

    switch (questionType) {
      case PromptType.TERM:
        correctChoice = question.term;
        chosenChoice = choice.term;
        break;
      case PromptType.DEF:
        correctChoice = question.definition;
        chosenChoice = choice.definition;
        break;
      case PromptType.IMG: // Assume image title is unique across images
        correctChoice = question.image.title;
        chosenChoice = choice.image.title;
        break;
      default:
        return null;
    }

    return correctChoice === chosenChoice;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-5 p-5">
      <div
        className="col-span-1 sm:col-span-2"
      >
        <QuestionBox
          question={question}
          questionType={questionType}
          answerType={choiceType}
        />
      </div>

      {choices.map((choice, index) => (
        <ChoiceBox
          choiceId={index}
          choice={choice}
          choiceType={choiceType}
          variant={formSubmitted ? (
            (index === selectedChoice) ? (
              isCorrectChoice(choice) ? ("correct") : ("incorrect")
            ) : (
              (selectedChoice === null) ? (
                isCorrectChoice(choice) ? ("timeoutCorrect") : ("notPicked")
              ) : (
                isCorrectChoice(choice) ? ("correct") : ("notPicked")
              )
            )
          ) : (
            "notPicked"
          )}
          onClick={() => {select(index)}}
          disabled={formSubmitted}
        />
      ))}
    </div>
  );
};