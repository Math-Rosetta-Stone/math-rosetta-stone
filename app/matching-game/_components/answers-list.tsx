"use client";

import { AnswerBox } from "./answer-box";

import {
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";

import { useState } from "react";

interface AnswersListProps {
  definitions: string[];
}

export const AnswersList = ({
  definitions,
}: AnswersListProps) => {
  const [answers, setAnswers] = useState(definitions);

  const onDragStart = (result: any) => {
    console.log(result);
  };

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

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="answers">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex flex-col border border-red-600"
          >
            {answers.map((answer, index) => (
              <Draggable
                key={`answer-${index}`}
                index={index}
                draggableId={`answer-${index}`}
              >
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    className="border border-red-600"
                  >
                    <AnswerBox
                      definition={answer}
                      dragHandleProps={draggableProvided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>

      {/* <div
        className="flex flex-col"
        >
        {definitions.map((definition) => {
          return <AnswerBox definition={definition} />
          })}
      </div> */}
    </DragDropContext>
  );
};