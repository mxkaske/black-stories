import { redis } from "@/lib/upstash";
import game from "@/content/games/002.json";
import { ChatInteraction } from "@/types";
import { Form } from "./form";
import { gameIdKey } from "@/lib/redis/keys";

export default async function Home() {
  const data = (await redis.zrange(gameIdKey, 0, -1)) as ChatInteraction[];
  return (
    <>
      <div className="mx-auto grid max-w-xl gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
        <p className="text-lg text-gray-700">{game.description}</p>
        {/* use `marker:text-gray-700 for decoration */}
        <ol className="mb-4 grid list-inside list-decimal gap-3 text-gray-900">
          {data.map(({ question, answer }, i) => (
            <li key={i}>
              <span className="font-light text-gray-700">{question}</span>
              <span className="pl-1">{answer}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="sticky inset-x-0 bottom-4 mx-auto max-w-xl rounded-xl border p-3 shadow-sm backdrop-blur-lg">
        {/* maybe add progress bar in here? */}
        <Form />
      </div>
    </>
  );
}
