"use client";

import { allGames } from "contentlayer/generated";

export default function SolutionButton({ slug }: { slug: string }) {
  const game = allGames.find((g) => g.slug === slug); // has to be defined, otherwise notFound() in page.tsx

  const onClick = () => {
    alert(game?.solution);
  };

  return (
    <button
      className="w-full rounded-md border bg-white px-3 py-2 hover:bg-gray-50"
      onClick={onClick}
    >
      See Solution
    </button>
  );
}
