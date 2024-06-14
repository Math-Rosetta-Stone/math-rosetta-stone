import { shuffle } from "@/lib/utils";
import { Matching } from "./_components/matching";

const termToDefinition = {
  "derivative": "rate of change",
  "integral": "area under the curve",
  "limit": "approaching a value",
  "function": "relation between inputs and outputs",
};

const MatchingGame = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">

      <div className="text-4xl">
        Matching Game
      </div>

      <div
        className="flex flex-col
        rounded-lg shadow-md border border-neutral-200 pb-2"
      >
        <div
          className="flex flex-row rounded-lg justify-between w-full
          border-b border-neutral-200 py-2 px-3 bg-slate-50"
        >
          <div>Level #</div>
          <div>Timer</div>
        </div>

        <div
          className="flex flex-row justify-between w-full
          py-2 px-3 bg-slate-50"
        >
          Instructions
        </div>

        <Matching
          terms={shuffle(Object.keys(termToDefinition))}
          definitions={shuffle(Object.values(termToDefinition))}
          answerKey={termToDefinition}
        />

      </div>
    </div>
  );
};

export default MatchingGame;