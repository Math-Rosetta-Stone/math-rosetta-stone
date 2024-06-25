"use client";

import { useState } from "react";
import { PromptType, TermItem } from "@/types/mcq";

import { QuestionBox } from "./question-box";
import { ChoiceBox } from "./choice-box";

interface McqProps {
  question: TermItem;
  questionType: PromptType;
  choices: TermItem[];
  choiceType: PromptType;
  handleSubmit: () => void;
  formSubmitted: boolean;
}

export const Mcq = ({
  question,
  questionType,
  choices,
  choiceType,
  handleSubmit,
  formSubmitted,
}: McqProps) => {
  const [chosenChoice, setChosenChoice] = useState<number | null>(null);

  const choose = (index: number) => {
    setChosenChoice(index);
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
          key={`${choice}-${index}`}
          choiceId={index}
          choice={choice}
          choiceType={choiceType}
          variant={formSubmitted ? (
            (index === chosenChoice) ? (
              isCorrectChoice(choice) ? ("correct") : ("incorrect")
            ) : (
              isCorrectChoice(choice) ? ("correct") : ("notPicked")
            )
          ) : (
            "notPicked"
          )}
          onClick={() => {
            if (!formSubmitted) choose(index)
          }}
          disabled={formSubmitted}
        />
      ))}
    </div>
  );
};