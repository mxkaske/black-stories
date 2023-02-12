import { allGames } from "contentlayer/generated";

export const promptKeyBySlug = (slug: string) => `${slug}:ip`;

export const generatePromptBySlug = (slug: string, question: string) => {
  const game = allGames.find((game) => game.slug === slug);

  if (!game) {
    throw new Error("Game does not exist. Please enter a correct slug");
  }

  return `
We are playing a game called Death delayed. The description is known by the user and he/she needs to find the answer. You are only allowed to answer with a single word. Mostly "yes"/"no"/"somethines"/"probably"/"n/a",...

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
Q: ${question}
A:
  `;
};
