// import { allGames } from "contentlayer/generated";
import allGames from "@/content/hotfix_allGames.json";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto grid max-w-xl gap-4 py-4 sm:px-4">
      <ul className="grid gap-4 text-gray-900">
        {allGames.map(({ title, url, description }, i) => (
          <Link
            key={i}
            href={url}
            className="group rounded-lg border border-gray-100 py-3 px-4 hover:border-gray-200"
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
