export type ChatInteraction = {
  question: string;
  answer: string;
};

export type Game = {
  name: string;
  description: string;
  answer: string;
  training: ChatInteraction[];
};
