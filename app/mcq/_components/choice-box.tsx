"use client";

import { cn } from "@/lib/utils";

import { CircleAlert } from "lucide-react";
import Image from "next/image";

const choiceIds = ["A.", "B.", "C.", "D."];

interface ChoiceBoxProps {
  choiceId: number;
  choice?: string;
  imageUrl?: string;
  imageTitle?: string;
  variant: "notPicked" | "correct" | "incorrect";
}

export const ChoiceBox = ({
  choiceId,
  choice,
  imageUrl,
  imageTitle,
  variant
}: ChoiceBoxProps) => {
  return (
    <div
      className={cn(
        "rounded shadow-sm flex flex-row w-full text-wrap border ease-in duration-100\
        text-base font-medium",
        (variant === "notPicked") &&
          "border-neutral-300 hover:ring-1 hover:ring-slate-300 \
          active:ring-1 active:ring-slate-900",
        (variant === "correct") && "border-green-600 bg-green-50 shadow-green-50",
        (variant === "incorrect") && "border-red-400 bg-red-50 shadow-red-50"
      )}
    >

      {choice ? (
        <div className="m-3">
          {choiceIds[choiceId] + " " + choice}
        </div>
      ) : (imageUrl && imageTitle) ? (
        <div className="flex flex-row gap-2">
          {choiceIds[choiceId]}
          <Image src={imageUrl} alt={imageTitle} />
        </div>
      ) : (
        <CircleAlert color="red" />
      )}
    </div>
  );
};