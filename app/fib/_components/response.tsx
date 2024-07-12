import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlarmClock, Check, CircleX } from "lucide-react";

interface ResponseProps {
  correctAnswer: string;
  variant: "correct" | "incorrect" | "timeout";
}

export const Response = ({
  correctAnswer,
  variant,
}: ResponseProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={correctAnswer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("rounded p-3 w-full\
          text-wrap text-sm",
          (variant === "correct") && "bg-green-50 text-green-600",
          (variant === "incorrect") && "bg-red-50 text-red-600",
          (variant === "timeout") && "bg-orange-50 text-orange-500"
        )}
      >

        {variant === "correct" && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-start items-center gap-1 font-bold">
              <Check className="h-4 w-4" />
              Correct
            </div>
            <span>The answer is: {correctAnswer}</span>
          </div>
        )}

        {variant === "incorrect" && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-start items-center gap-1 font-bold">
              <CircleX className="h-4 w-4" />
              Incorrect
            </div>
            <span>Correct answer: {correctAnswer}</span>
          </div>
        )}

        {variant === "timeout" && (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-start items-center gap-1 font-bold">
              <AlarmClock className="h-4 w-4" />
              Time's up!
            </div>
            <span>Correct answer: {correctAnswer}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};