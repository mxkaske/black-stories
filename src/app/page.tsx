// import { allGames } from "contentlayer/generated";
import allGames from "@/content/hotfix_allGames.json";
import Link from "next/link";
import UiLink from "@/components/ui/link";

export default async function Home() {
  return (
    <div className="mx-auto grid max-w-xl gap-10 py-4 sm:px-4">
      <div>
        <h1 className="max-w-sm text-xl font-semibold">
          Solving the Shadows: The Ultimate AI Black Stories Experience
        </h1>
        <p className="text-lg font-light">
          Never be the storyteller again. Solve the mystery together.
        </p>
        <p className="text-lg font-light">The anti-social Black Story game.</p>
      </div>
      <ul className="grid gap-4 text-gray-900">
        {allGames
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map(({ title, url, description, slug }, i) => {
            return (
              <Link
                key={i}
                href={url}
                className="group rounded-lg border border-gray-100 py-3 px-4 hover:border-gray-200"
              >
                <li>
                  <p className="font-medium text-gray-900 underline-offset-4 group-hover:underline">
                    {title}
                  </p>
                  <p className="text-gray-500 line-clamp-1 group-hover:text-gray-700">
                    {description}
                  </p>
                </li>
              </Link>
            );
          })}
      </ul>
      <div className="max-w-md space-y-4 px-4 font-light">
        <p>
          You have some suggestions, feedback, or a new black story to add? Feel
          free to DM me{" "}
          <UiLink href="https://twitter.com/mxkaske">@mxkaske</UiLink>.
        </p>
        <p>
          Credits to{" "}
          <UiLink href="https://yesnogame.net/en/scary">yesnogame</UiLink> for
          the game inspirations.
        </p>
      </div>
    </div>
  );
}
