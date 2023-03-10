import { allGames } from "contentlayer/generated";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  // https://github.com/vercel/next.js/issues/45979
  // REMINDER: currently, cookie cannot be access on dynamic pages, but accessible here
  const cookiesStore = cookies();
  console.log(cookiesStore.getAll());
  return (
    <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
      <ul className="grid gap-4 text-gray-900">
        {allGames.map(({ title, url, description }, i) => (
          <Link
            key={i}
            href={url}
            className="group rounded-lg border py-3 px-4 hover:bg-gray-50"
          >
            <li>
              <p className="font-medium text-gray-900">{title}</p>
              <p className="text-gray-500 line-clamp-1 group-hover:text-gray-700">
                {description}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
