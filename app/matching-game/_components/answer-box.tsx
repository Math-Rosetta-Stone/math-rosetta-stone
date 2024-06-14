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
  style: any;
  variant: "unsubmitted" | "correct" | "incorrect";
}

export const AnswerBox = React.forwardRef<HTMLDivElement, AnswerBoxProps>(({
    definition,
    imageUrl,
    imageTitle,
    draggableProps,
    dragHandleProps,
    style,
    variant,
}: AnswerBoxProps, ref) => {
  return (
    <div
      className={cn(
          "rounded shadow-md flex flex-row w-64 text-wrap border",
          (variant === "unsubmitted") && "border-neutral-300",
          (variant === "correct") && "border-green-600 bg-green-50 shadow-green-50",
          (variant === "incorrect") && "border-red-400 bg-red-50 shadow-red-50"
        )}
      ref={ref}
      {...draggableProps}
      style={style}
    >
      <div
        className={cn(
          "rounded-l flex flex-col justify-center bg-slate-100 px-1 border-r border-r-neutral-300",
          (variant === "unsubmitted") && "hover:bg-slate-200 hover:cursor-grab ease-in duration-100",
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