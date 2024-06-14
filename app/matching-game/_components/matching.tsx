"use client";

import { useState } from "react";
import { cn, shuffle } from "@/lib/utils";

import { QuestionBox } from "./question-box";
import { AnswerBox } from "./answer-box";

import {
  DragDropContext,
  Draggable,
  DraggableStateSnapshot,
  DraggableStyle,
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
}

export const Matching = ({
  terms,
  definitions,
  answerKey,
}: MatchingProps) => {
  const [answers, setAnswers] = useState(definitions);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onDragEnd = (result: any) => {
    console.log(result);

    if (!result.destination) return;

    // SOURCE: https://codesandbox.io/p/devbox/albertogandarillas-react-todo-hellopangea-dnd-rvmm4v?file=%2Fsrc%2FApp.jsx%3A47%2C16-47%2C21
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyAnswers = [...answers];
    const [reorderAnswer] = copyAnswers.splice(startIndex, 1);
    copyAnswers.splice(endIndex, 0, reorderAnswer);
    setAnswers(copyAnswers);
  };

  const getSkipDropAnimationStyle = (
    style: DraggableStyle | undefined,
    snapshot: DraggableStateSnapshot
  ) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but has to be super tiny
      transitionDuration: `0.001s`,
    };
  };

  const onSubmit = () => {
    setFormSubmitted(true);
  };

  const onReset = () => {
    setFormSubmitted(false);
  };

  const onShuffle = () => {
    console.log("Before:", answers);
    setAnswers(shuffle(answers));
    console.log("After:", answers);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {/* Outermost box */}
      <div className="flex flex-col items-center">
        {answers.map((answer, index) => (
          <div
            className="flex flex-row justify-center items-center w-full m-5"
          >
            <QuestionBox term={terms[index]} />

            <div className="border border-black h-0 min-w-24"></div>

            <Droppable droppableId={`answer-${index}`}>
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className={cn(
                    "flex flex-col items-center rounded w-64",
                    !formSubmitted && "active:ring-2 active:ring-slate-700"
                  )}
                >
                  <Draggable
                    key={`answer-${index}`}
                    index={index}
                    draggableId={`answer-${index}`}
                  >
                    {(draggableProvided, snapshot) => (
                      <AnswerBox
                        definition={answer}
                        ref={!formSubmitted ? draggableProvided.innerRef: null}
                        draggableProps={!formSubmitted ? draggableProvided.draggableProps : null}
                        dragHandleProps={!formSubmitted ? draggableProvided.dragHandleProps : null}
                        style={getSkipDropAnimationStyle(draggableProvided.draggableProps.style, snapshot)}
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
            hover:border-slate-300 ease-in duration-100
            disabled:bg-slate-300 disabled:text-slate-900"
            disabled={formSubmitted}
            variant="default"
            onClick={onSubmit}
          >
            Submit
          </Button>

          <RotateCcw
            className={cn(
              "text-slate-300",
              formSubmitted && "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
            )}
            onClick={onReset}
          />

          {/* <Shuffle
            className={cn(
              "text-slate-300",
              formSubmitted && "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
            )}
            onClick={onShuffle}
          /> */}
        </div>
      </div>
    </DragDropContext>
  );
};