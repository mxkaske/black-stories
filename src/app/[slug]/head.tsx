import { allGames } from "contentlayer/generated";
import { notFound } from "next/navigation";

export default function Head({ params }: { params: { slug: string } }) {
  // TODO: how to get url?_token or cookie()
  const game = allGames.find(({ slug }) => params.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <>
      <title>Black Stories</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Black Stories: OSS - Powered by Vercel and OpenAI"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:description"
        content="Black Stories - OSS powered by Vercel and OpenAI"
      />
      <meta
        property="og:image"
        content={`/api/og?slug=${params.slug}&title=${game.title}`}
      />
    </>
  );
}
