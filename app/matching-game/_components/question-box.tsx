interface QuestionBoxProps {
  term: string;
}

export const QuestionBox = ({
  term
}: QuestionBoxProps) => {
  return (
    <div
      className="rounded-lg shadow-md border border-neutral-50 p-5 m-5"
    >
      {term}
    </div>
  );
}