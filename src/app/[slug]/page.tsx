import { Form } from "./form";
import { allGames } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Content from "./content";

// REMINDER: dynamic rerender https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

export async function generateStaticParams() {
  return allGames.map(({ slug }) => ({ slug }));
}

// TODO: once `cookies()` is fixed, allow RSC here!

export default async function Slug({ params }: { params: { slug: string } }) {
  const game = allGames.find((c) => c.slug === params.slug);

  if (!game) {
    notFound();
  }

  return (
    <>
      <Content game={game} />
      <div className="sticky inset-x-0 bottom-4 mx-auto max-w-xl rounded-xl border p-3 shadow-sm backdrop-blur-lg">
        <Form slug={game.slug} />
      </div>
    </>
  );
}
