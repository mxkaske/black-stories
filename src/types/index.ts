export type ChatInteraction = {
  question: string;
  answer: string;
  significance: number;
};

export type Game = {
  name: string;
  description: string;
  answer: string;
  training: ChatInteraction[];
};
