"use client";

import { useState } from "react";
import { PromptType, TermItem } from "@/types/mcq";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FibProps {
  question: TermItem;
  // questionType: PromptType;
  answerWithBlank: string;
  handleSubmit: () => void;
  formSubmitted: boolean;
  updateScore: () => void;
}

export const Fib = ({
  question,
  // questionType,
  answerWithBlank,
  handleSubmit,
  formSubmitted,
  updateScore,
}: FibProps) => {
  const [answer, setAnswer] = useState<string>("");

  const fill = () => {

  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div
        className="rounded shadow-sm border border-neutral-300 p-3
        w-full text-wrap
        text-base font-normal"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        <Input
          className="inline ml-1 py-0 px-2 w-24
          border-t-0 border-x-0 border-b-2 border-b-slate-900 rounded-none rounded-t-md
          ease-in duration-200 transition-[background-color] hover:bg-slate-100 focus-visible:bg-slate-100
          focus-visible:ring-transparent focus-visible:ring-offset-0"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <Button
        className="border hover:bg-slate-100 hover:text-slate-900
        hover:border-slate-300 ease-in duration-150
        disabled:bg-slate-300 disabled:text-slate-900"
        disabled={formSubmitted}
        variant="default"
        onClick={fill}
      >
        Submit
      </Button>
    </div>
  );
};