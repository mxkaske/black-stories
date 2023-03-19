import { redis } from "@/lib/upstash";
import { ChatInteraction } from "@/types";
import { Form } from "./components/form";
// import { allGames } from "contentlayer/generated";
import allGames from "@/content/hotfix_allGames.json";
import { notFound } from "next/navigation";
import { promptKeyBySlug } from "@/lib/prompt";
import ResetDialog from "./components/reset-dialog";
import SolutionDialog from "./components/solution-dialog";
import DISIButton from "./components/disi-button";
import { cookies } from "next/headers";
import ShareButton from "./components/share-button";
import List from "./components/list";
import type { Metadata } from "next";
// MOCK DATA
// import { data } from "@/lib/mock";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Slug({ params }: { params: { slug: string } }) {
  const game = allGames.find((c) => c.slug === params.slug);

  if (!game) {
    notFound();
  }

  const token = cookies().get("token")?.value;
  const key = promptKeyBySlug(params.slug, token);
  // REMINDER: here is the issue...
  const data = (await redis.zrange(key, 0, -1)) as ChatInteraction[];

  // TODO: check if vercel is compiling - last time it did not work
  const isSolved = data.at(-1)?.answer === "Solved";

  return (
    <>
      <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
          <div className="flex w-36 items-start justify-end gap-2">
            {data.length > 0 && <ResetDialog slug={params.slug} />}
            <SolutionDialog slug={params.slug} />
          </div>
        </div>
        <p className="border-b border-gray-100 pb-4 text-gray-600">
          {game.description}
        </p>
        <List data={data} />
        {/* TODO: add <Stats /> here */}
        <div>{isSolved ? <ShareButton slug={params.slug} /> : null}</div>
      </div>
      {!isSolved ? (
        <div className="sticky inset-x-0 bottom-4 mx-auto max-w-xl">
          {/* maybe add progress bar in here? */}
          <div className="w-full bg-gradient-to-b from-transparent to-white/90 pb-2 text-right sm:px-4">
            {data.length > 0 ? <DISIButton slug={params.slug} /> : null}
          </div>
          <div className="rounded-xl border p-3 shadow-sm backdrop-blur-lg">
            <Form slug={params.slug} />
          </div>
        </div>
      ) : null}
    </>
  );
}

// REMINDER: Nextjs bug - searchParams only accessible in `page.tsx`
export function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { _token?: string };
}): Metadata {
  const { _token } = searchParams;
  const game = allGames.find((c) => c.slug === params.slug);

  if (!game) {
    notFound();
  }

  return {
    title: game.title,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${game.title}&slug=${game.slug}${
            _token ? `&_token=${_token}` : ""
          }`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
