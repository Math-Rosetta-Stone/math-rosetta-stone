"use client";

import { useEffect, useRef, useState } from "react";
import { cn, shuffle } from "@/lib/utils";

import { QuestionBox } from "./question-box";
import { AnswerBox } from "./answer-box";

import {
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { RotateCcw, Shuffle } from "lucide-react";


interface MatchingProps {
  terms: string[];
  definitions: string[];
  answerKey: {
    [key: string]: string
  };
  handleResetTimer: () => void;
  handleSubmit: () => void;
  handleShuffle: (shuffledTerms: string[], shuffledDefinitions: string[]) => void;
  formSubmitted: boolean;
}

export const Matching = ({
  terms,
  definitions,
  answerKey,
  handleResetTimer,
  handleSubmit,
  handleShuffle,
  formSubmitted,
}: MatchingProps) => {
  const [questions, setQuestions] = useState(terms);
  const [answers, setAnswers] = useState(definitions);
  const [minHeights, setMinHeights] = useState<number[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);
  const refs = useRef<HTMLDivElement[]>([]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyAnswers = [...answers];

    // Swap the source and destination answers
    const temp = copyAnswers[startIndex];
    copyAnswers[startIndex] = copyAnswers[endIndex];
    copyAnswers[endIndex] = temp;
    setAnswers(copyAnswers);
  };

  const onSubmit = () => {
    handleSubmit();
  };

  const onReset = () => {
    handleResetTimer();
  };

  const onShuffle = () => {
    const shuffledTerms = shuffle(terms);
    const shuffledDefinitions = shuffle(definitions);

    setQuestions(shuffledTerms);
    setAnswers(shuffledDefinitions);
    setShuffleKey((prev) => 1 - prev);
    handleResetTimer();
    handleShuffle(shuffledTerms, shuffledDefinitions);
  };

  useEffect(() => {
    const heights = refs.current.map(ref => ref?.clientHeight || 0);
    setMinHeights(heights);
  }, [answers]);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-col items-center">
        {answers.map((answer, index) => (
          <div
            key={`${shuffleKey}-${index}`}
            className="flex flex-row justify-center items-center w-full m-5"
          >
            <QuestionBox term={terms[index]} />

            <div className="border border-black h-0 min-w-24"></div>

            <Droppable
              droppableId={`answer-${index}`}
              direction="horizontal">
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className="flex flex-col items-center justify-center rounded w-64"
                  style={{ minHeight: Math.max(...minHeights) || 'auto' }} // Set min-height to prevent jumping
                >
                  <Draggable
                    key={`answer-${index}`}
                    index={index}
                    draggableId={`answer-${index}`}
                  >
                    {(draggableProvided) => (
                      <AnswerBox
                        definition={answer}
                        ref={!formSubmitted ? (el) => {
                          draggableProvided.innerRef(el);
                          if (el) refs.current[index] = el; // Store the ref to measure height
                        } : null}
                        draggableProps={!formSubmitted ? draggableProvided.draggableProps : null}
                        dragHandleProps={!formSubmitted ? draggableProvided.dragHandleProps : null}
                        variant={!formSubmitted
                          ? "unsubmitted"
                          : (answerKey[terms[index]] === answer)
                            ? "correct"
                            : "incorrect"}
                      />
                    )}
                  </Draggable>
                </div>
              )}
            </Droppable>
          </div>
        ))}

        <div className="flex flex-row justify-between items-center gap-5">
          <Button
            className="border hover:bg-slate-50 hover:text-slate-900
            hover:border-slate-300 ease-in duration-150
            disabled:bg-slate-300 disabled:text-slate-900"
            disabled={formSubmitted}
            variant="default"
            onClick={onSubmit}
          >
            Submit
          </Button>

          <RotateCcw
            className={cn(
              "text-slate-300 ease-in duration-150",
              formSubmitted && "text-slate-900 hover:cursor-pointer\
              hover:bg-slate-50"
            )}
            onClick={onReset}
          />

          <Shuffle
            className={cn(
              "text-slate-300 ease-in duration-150",
              !formSubmitted && "text-slate-900 hover:cursor-pointer\
              hover:bg-slate-50"
            )}
            onClick={onShuffle}
          />
        </div>
      </div>
    </DragDropContext>
  );
};