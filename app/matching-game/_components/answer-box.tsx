import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import {
  Equal,
  CircleAlert,
} from "lucide-react";
import Image from "next/image";

interface AnswerBoxProps {
  definition?: string;
  imageUrl?: string;
  imageTitle?: string;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export const AnswerBox = ({
    definition,
    imageUrl,
    imageTitle,
    dragHandleProps,
}: AnswerBoxProps) => {
  return (
    <div
      className="rounded-lg shadow-md border border-neutral-50
      flex flex-row m-5"
    >
      <div
        className="flex flex-col justify-center bg-slate-100 px-1
        hover:bg-slate-200 ease-in duration-100"
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
};