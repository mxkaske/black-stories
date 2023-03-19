import { ChatInteraction } from "@/types";
// import { allGames } from "contentlayer/generated";
import allGames from "@/content/hotfix_allGames.json";

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
The description is known by the user and he/she needs to find the solution by asking questions. You are only allowed to answer with "Yes", "No", "N/A" or "Solved". You are only allowed to answer with "Solved" if the user, by the chat history, found the key points of solution. It doesn't have to sound the same.

Description: ${game.description}

Solution: ${game.solution}

${
  history && history.length > 0
    ? history
        .map(({ question, answer }) => {
          return `
Q: ${question}
A: ${answer}
  `;
        })
        .join("")
    : ""
}
Q: ${question}
A: 
  `;
};
