"use client";

import { cn } from "@/lib/utils";
import { PromptType, TermItem } from "@/types/mcq";

import { CircleAlert } from "lucide-react";
import Image from "next/image";

const choiceIds = ["A.", "B.", "C.", "D."];

interface ChoiceBoxProps {
  choiceId: number;
  choice: TermItem;
  choiceType: PromptType;
  variant: "notPicked" | "correct" | "incorrect" | "timeoutCorrect";
  onClick: () => void;
  disabled: boolean;
}

export const ChoiceBox = ({
  choiceId,
  choice,
  choiceType,
  variant,
  onClick,
  disabled = false,
}: ChoiceBoxProps) => {
  return (
    <div
      className={cn(
        "rounded shadow-sm flex flex-row w-full h-full text-wrap\
        border ease-in duration-100 text-base font-medium",
        (variant === "notPicked" && !disabled) &&
          "border-neutral-300 hover:ring-1 hover:ring-slate-300 hover:cursor-pointer \
          active:ring-1 active:ring-slate-900",
        (variant === "correct") && "border-green-600 bg-green-50 shadow-green-50",
        (variant === "incorrect") && "border-red-400 bg-red-50 shadow-red-50",
        (variant === "timeoutCorrect") && "border-orange-400 bg-orange-50 shadow-orange-50"
      )}
      onClick={() => {if (!disabled) onClick()}}
    >
      <div
        className={cn(
          "rounded-l flex flex-col justify-center\
          bg-slate-100 px-2 border-r border-r-neutral-300 ease-in duration-100",
          (variant === "correct") && "border-green-600",
          (variant === "incorrect") && "border-red-400",
          (variant === "timeoutCorrect") && "border-orange-400"
        )}
      >
        {choiceIds[choiceId]}
      </div>

      <div className="m-3 flex flex-col justify-center">
        {choiceType === PromptType.TERM ? (
          choice.term
        ) : (
          choiceType === PromptType.DEF ? (
            choice.definition
          ) : (
            <Image src={choice.image.url} alt={choice.image.title} height={120} width={120} />
        ))}
      </div>
    </div>
  );
};