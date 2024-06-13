import { QuestionBox } from "./_components/question-box";
import { AnswersList } from "./_components/answers-list";

import { Button } from "@/components/ui/button";

const terms = ["derivative", "integral", "limit", "function"];
const definitions = ["rate of change", "area under the curve", "approaching a value", "relation between inputs and outputs"];

const MatchingGame = () => {
  return (
    <div
      className="flex flex-col
      rounded-lg shadow-md border border-neutral-50
      mx-20 mt-20 p-2"
    >
      <div
        className="flex flex-row justify-between
        w-full border border-red-500"
      >
        <div>Level #</div>
        <div>Timer</div>
      </div>

      <div
        className="flex flex-row justify-between
        w-full border border-red-500"
      >
        Instructions
      </div>

      <div
        className="flex flex-row justify-between
        w-full border border-blue-500"
      >
        <div
          className="flex flex-col"
        >
          {terms.map((term) => {
            return <QuestionBox term={term} />
          })}
        </div>

        <AnswersList definitions={definitions} />
      </div>

      <Button>Submit</Button>

    </div>
  );
};

export default MatchingGame;