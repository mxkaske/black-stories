import { ANSWERS } from "@/lib/validation";

export type ChatInteraction = {
  question: string;
  answer: (typeof ANSWERS)[number];
};

export type Game = {
  name: string;
  description: string;
  answer: string;
  training: ChatInteraction[];
};
