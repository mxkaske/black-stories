import { ChatInteraction } from "@/types";
import { allGames } from "contentlayer/generated";

export const promptKeyBySlug = (slug: string, id = "id") =>
  `game:${slug}:${id}`;

export const generatePromptBySlug = (
  slug: string,
  question: string,
  history?: ChatInteraction[]
) => {
  const game = allGames.find((game) => game.slug === slug);

  if (!game) {
    throw new Error("Game does not exist. Please enter a correct slug");
  }

  return `
The description is known by the user and he/she needs to find the solution by asking questions. You are only allowed to answer with "Yes", "No", "N/A" or "Solved". You are only allowed to answer with "Solved" if the user, by the chat history, found the key points to the solutions. It doesn't have to be word by word.

Description: ${game.description}

Solution: ${game.solution}

Here are some examples for this specific game:
  ${game.training
    ?.map(({ question, answer }) => {
      return `
Q: ${question}
A: ${answer}
    `;
    })
    .join("")}

Here is the user's history of questions and answers:
${history
  ?.map(({ question, answer }) => {
    return `
Q: ${question}
A: ${answer}
  `;
  })
  .join("")}

His current question is:
Q: ${question}
A: 
  `;
};
