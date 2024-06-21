"use client";

import React from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import {
  Equal,
  CircleAlert,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnswerBoxProps {
  definition?: string;
  imageUrl?: string;
  imageTitle?: string;
  draggableProps: DraggableProvidedDraggableProps | null;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  variant: "unsubmitted" | "correct" | "incorrect";
}

export const AnswerBox = React.forwardRef<HTMLDivElement, AnswerBoxProps>(({
    definition,
    imageUrl,
    imageTitle,
    draggableProps,
    dragHandleProps,
    variant,
}: AnswerBoxProps, ref) => {
  return (
    <div
      className={cn(
          "rounded shadow-md flex flex-row w-64 text-wrap border ease-in duration-100\
          text-base font-medium",
          (variant === "unsubmitted") &&
            "border-neutral-300 hover:ring-2 hover:ring-slate-300 \
            active:ring-2 active:ring-slate-900",
          (variant === "correct") && "border-green-600 bg-green-50 shadow-green-50",
          (variant === "incorrect") && "border-red-400 bg-red-50 shadow-red-50"
        )}
      ref={ref}
      {...draggableProps}
    >
      <div
        className={cn(
          "rounded-l flex flex-col justify-center\
          bg-slate-100 px-1 border-r border-r-neutral-300 ease-in duration-100",
          (variant === "unsubmitted") && "hover:bg-slate-200 hover:cursor-grab",
          (variant === "correct") && "border-green-600",
          (variant === "incorrect") && "border-red-400"
        )}
        {...dragHandleProps}
      >
        <Equal color="black" />
      </div>

      {definition ? (
        <div className="m-3">
          {definition}
        </div>
      ) : (imageUrl && imageTitle) ? (
        <Image src={imageUrl} alt={imageTitle} />
      ) : (
        <CircleAlert color="red" />
      )}
    </div>
  );
});