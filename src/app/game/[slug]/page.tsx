import { redis } from "@/lib/upstash";
import { ChatInteraction } from "@/types";
import { Form } from "./form";
import { allGames } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { promptKeyBySlug } from "@/lib/prompt";
import ResetDialog from "./reset-dialog";
import SolutionDialog from "./solution-dialog";
import ShareButton from "./share-button";
import { cn } from "@/lib/utils";

// REMINDER: dynamic rerender https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

export async function generateStaticParams() {
  return allGames.map(({ slug }) => ({ slug }));
}

export default async function Slug({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const game = allGames.find((c) => c.slug === params.slug);

  if (!game) {
    notFound();
  }

  // FIXME: `cookies()` not working with `generateStaticParms`
  // const token = cookies().get("token")?.value;
  // TODO: remove later
  const _token = searchParams?.["_token"] as string | undefined;
  const key = promptKeyBySlug(params.slug, _token); // add token
  const data = (await redis.zrange(key, 0, -1)) as ChatInteraction[];

  // const res = await fetch(
  //   `${process.env.VERCEL_URL || "http://localhost:3000"}/api/generate/${
  //     params.slug
  //   }`
  // );
  // const data = (await res.json()) as ChatInteraction[];

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
        <p className="text-gray-700">{game.description}</p>
        {/* use `marker:text-gray-700 for decoration */}
        <ol className="mb-4 grid list-inside list-decimal gap-2 text-gray-900">
          {data.map(({ question, answer }, i) => {
            return (
              <li key={i}>
                <span className="mr-2 font-light">{question}</span>
                <span
                  className={cn({
                    "text-red-600": answer === "No",
                    "text-green-600": answer === "Yes",
                    "text-gray-600": answer === "N/A",
                    "rounded-md bg-green-500 px-1 text-white":
                      answer === "Solved",
                  })}
                >
                  {answer}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="sticky inset-x-0 bottom-4 mx-auto max-w-xl rounded-xl border p-3 shadow-sm backdrop-blur-lg">
        {/* maybe add progress bar in here? */}
        <Form slug={params.slug} />
      </div>
    </>
  );
}
