import { allGames } from "contentlayer/generated";

export const promptKeyBySlug = (slug: string, id = "id") =>
  `game:${slug}:${id}`;

export const generatePromptBySlug = (slug: string, question: string) => {
  const game = allGames.find((game) => game.slug === slug);

  if (!game) {
    throw new Error("Game does not exist. Please enter a correct slug");
  }

  return `
We are playing a game called black stories. The description is known by the user and he/she needs to find the answer. You are only allowed to answer with "Yes", "No" or "N/A". Additionally to the allowed answer will be added a hole 'significance' number between 0 and 5 to describe the importance of the question.

Description: ${game.description}

Solution: ${game.solution}

Here are some examples for this specific game:
  ${game.training
    ?.map(({ question, answer, significance }) => {
      return `
Q: ${question}
A: ${answer},${significance} 
    `;
    })
    .join("")}
Q: ${question}
A:
  `;
};
