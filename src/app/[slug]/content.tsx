"use client";

import { ChatInteraction } from "@/types";
import ResetDialog from "./reset-dialog";
import SolutionDialog from "./solution-dialog";
import { Game } from "contentlayer/generated";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Content({ game }: { game: Game }) {
  const { data, isLoading } = useSWR<ChatInteraction[]>(
    `/api/generate/${game.slug}`,
    fetcher
  );

  return (
    <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
        <div className="flex w-24 items-start justify-end gap-2">
          {data && data.length > 0 && <ResetDialog game={game} />}
          <SolutionDialog game={game} />
        </div>
      </div>
      <p className="text-gray-700">{game.description}</p>
      <ol className="mb-4 grid list-inside list-decimal gap-3 text-gray-900">
        {data?.map(({ question, answer, significance }, i) => (
          <li key={i}>
            <span className="font-light">{question}</span>
            <span className="p-1">{answer}</span>
            <span className="text-sm text-gray-500">({significance})</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
