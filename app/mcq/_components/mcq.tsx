"use client";

import { QuestionBox } from "./question-box";
import { ChoiceBox } from "./choice-box";

interface McqProps {
  question: string;
  choices: string[];
}

export const Mcq = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-5 p-5">
      <div
        className="col-span-1 sm:col-span-2"
      >
        <QuestionBox question="Q1fffffff" />
      </div>

      {["A", "B", "C", "D"].map((choice, index) => (
        <ChoiceBox
          key={`${choice}-${index}`}
          choiceId={index}
          choice={choice}
          variant="notPicked"
        />
      ))}
    </div>
  );
};