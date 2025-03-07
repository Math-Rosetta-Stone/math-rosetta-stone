"use client";

import { useState } from "react";
import { PromptType, TermItem } from "@/types/mcq";

import { ChoiceBox } from "../../mcq/_components/choice-box";
import { Button } from "@/components/ui/button";

interface McqProps {
  question: TermItem;
  choices: TermItem[];
  choiceType: PromptType;
  handleSubmit: () => void;
  formSubmitted: boolean;
  updateScore: () => void;
  speakWord: (word: string) => void;
}

export const Mcq = ({
  question,
  choices,
  choiceType,
  handleSubmit,
  formSubmitted,
  updateScore,
  speakWord,
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

    switch (choiceType) {
      case PromptType.TERM:
        correctChoice = question.term;
        chosenChoice = choice.term;
        break;
      case PromptType.DEF:
        correctChoice = question.definition;
        chosenChoice = choice.definition;
        break;
      default:
        return null;
    }

    return correctChoice === chosenChoice;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-5 p-5">
      <div className="col-span-1 sm:col-span-2">
        <div className="rounded shadow-sm border border-neutral-300 p-3 w-full text-wrap text-base font-normal">
          <div>
            Choose the correct <span className="font-medium underline underline-offset-2">term/definition</span>
          </div>
          <div>
            <Button onClick={() => speakWord("The term is:"+question.term)}>Listen to the term</Button>
            {choiceType === PromptType.DEF && (
              <Button onClick={() => {
                  speakWord("The choices are: ");
                  choices.forEach((choice, index) => {
                  const label = String.fromCharCode(65 + index);
                  //seperated so there is a pause
                  speakWord(`${label}.`);
                  speakWord(`${choice.definition}`);
                });
              }}>Listen to the choices</Button>
            )}
          </div>
        </div>
      </div>

      {choices.map((choice, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChoiceBox
            choiceId={index}
            choice={choice}
            choiceType={choiceType}
            variant={
              formSubmitted
                ? index === selectedChoice
                  ? isCorrectChoice(choice)
                    ? "correct"
                    : "incorrect"
                  : selectedChoice === null
                  ? isCorrectChoice(choice)
                    ? "timeoutCorrect"
                    : "notPicked"
                  : isCorrectChoice(choice)
                  ? "correct"
                  : "notPicked"
                : "notPicked"
            }
            onClick={() => {
              select(index);
            }}
            disabled={formSubmitted}
          />
        </div>
      ))}
    </div>
  );
};
