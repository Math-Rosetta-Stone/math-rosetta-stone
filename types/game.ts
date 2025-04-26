type Image = {
  title: string;
  url: string;
}

export type TermItem = {
  term: string;
  definition: string;
  image: Image;
  example: string;
};

export enum PromptType {
  TERM,
  DEF,
  IMG,
  EXMP,
}