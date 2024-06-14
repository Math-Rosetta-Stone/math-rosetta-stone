interface QuestionBoxProps {
  term: string;
}

export const QuestionBox = ({
  term
}: QuestionBoxProps) => {
  return (
    <div
      className="rounded shadow-md border border-neutral-300 p-3
      w-32 text-wrap"
    >
      {term}
    </div>
  );
}