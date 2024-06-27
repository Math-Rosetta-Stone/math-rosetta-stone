"use client";

import { TermItem, PromptType } from "@/types/mcq";
import Image from "next/image";

interface QuestionBoxProps {
  question: TermItem;
  questionType: PromptType;
  answerType: PromptType;
}

export const QuestionBox = ({
  question,
  questionType,
  answerType,
}: QuestionBoxProps) => {
  const getQuestionContent = () => {
    switch (questionType) {
      case PromptType.TERM:
        return question.term;
      case PromptType.DEF:
        return question.definition;
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

  return (
    <div
      className="rounded shadow-sm border border-neutral-300 p-3
      w-full text-wrap
      text-base font-normal"
    >
      <div>
        <span className="font-semibold underline underline-offset-2">
          {questionType === PromptType.TERM ? "Term" : questionType === PromptType.DEF ? "Definition" : "Image"}
        </span>: {getQuestionContent()}.
      </div>

      <div>
        Choose the correct <span className="font-medium underline underline-offset-2">
          {answerType === PromptType.TERM ? (
            "term") : (
              answerType === PromptType.DEF ? (
                "definition") : (
                  "image"
          ))}
        </span>:
      </div>
    </div>
  );
};
