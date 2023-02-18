import { redis } from "@/lib/upstash";
import { ChatInteraction } from "@/types";
import { Form } from "./form";
import { allGames } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { promptKeyBySlug } from "@/lib/prompt";
import ResetDialog from "./reset-dialog";
import SolutionDialog from "./solution-dialog";

// REMINDER: dynamic rerender https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

export async function generateStaticParams() {
  return allGames.map(({ slug }) => ({ slug }));
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const game = allGames.find((c) => c.slug === params.slug);

  if (!game) {
    notFound();
  }

  const key = promptKeyBySlug(params.slug);
  const data = (await redis.zrange(key, 0, -1)) as ChatInteraction[]; // TODO: add slug!

  return (
    <>
      <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
        <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
        <p className="text-gray-700">{game.description}</p>
        {/* use `marker:text-gray-700 for decoration */}
        <ol className="mb-4 grid list-inside list-decimal gap-3 text-gray-900">
          {data.map(({ question, answer, significance }, i) => (
            <li key={i}>
              <span className="font-light">{question}</span>
              <span className="p-1">{answer}</span>
              <span className="text-sm text-gray-500">({significance})</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="sticky inset-x-0 bottom-4 mx-auto max-w-xl rounded-xl border p-3 shadow-sm backdrop-blur-lg">
        {/* maybe add progress bar in here? */}
        <Form slug={params.slug} />
      </div>
      <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
        {data.length > 0 ? <ResetDialog slug={params.slug} /> : null}
        <SolutionDialog slug={params.slug} />
      </div>
    </>
  );
}
