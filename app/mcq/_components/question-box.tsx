"use client";

interface QuestionBoxProps {
  question: string;
}

export const QuestionBox = ({
  question
}: QuestionBoxProps) => {
  return (
    <div
      className="rounded shadow-sm border border-neutral-300 p-3
      w-full text-wrap
      text-base font-medium"
    >
      {question}
    </div>
  );
};