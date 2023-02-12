import { allGames } from "contentlayer/generated";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto grid max-w-xl gap-4">
      <h1 className="text-3xl font-bold text-gray-900">Black Stories</h1>
      <ul className="mb-4 grid gap-3 text-gray-900">
        {allGames.map(({ title, slug, description }, i) => (
          <Link
            key={i}
            href={`/${slug}`}
            className="group rounded-lg border p-3 hover:bg-gray-50"
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
