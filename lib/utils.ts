import { SelectTerms } from "@/app/db/schema";
import { TermItem } from "@/types/game";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffle = (array: any[]) => {
  let currIndex = array.length, randIndex, tempValue;

  while (currIndex !== 0) {
    randIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;

    tempValue = array[currIndex];
    array[currIndex] = array[randIndex];
    array[randIndex] = tempValue;
  }

  return array;
};

export const getOneRandom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const omitPassword = (array: any[]) => {
  return array.map(({ password_hash, ...rest }) => rest);
};

export const parseTerms = (termsData: SelectTerms[]): TermItem[] => {
  return termsData.map((term) => ({
    term: term.term,
    definition: term.definition,
    image: {
      title: "Not found",
      url: "/term-not-found.svg"},
    example: term.example,
  }));
};
