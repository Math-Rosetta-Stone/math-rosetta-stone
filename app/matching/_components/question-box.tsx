"use client";

interface QuestionBoxProps {
  question: string;
}

export const QuestionBox = ({
  question
}: QuestionBoxProps) => {
  return (
    <div
      className="rounded shadow-md border border-neutral-300 p-3
      w-32 text-wrap
      text-base font-medium"
    >
      {question}
    </div>
  );
}