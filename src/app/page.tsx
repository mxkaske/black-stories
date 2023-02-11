import { redis } from "@/lib/upstash";
import game from "@/content/games/002.json";
import { ChatInteraction } from "@/types";
import { Form } from "./form";

const key = "ip:id:chat";

const getChatHistory = async () => {
  // TODO: use zod validation instead of "as"
  return (await redis.zrange(key, 0, -1)) as ChatInteraction[];
};

const appendChat = async (props: ChatInteraction) => {
  return await redis.zadd(key, {
    score: Date.now(),
    member: props,
  });
};

export default async function Home() {
  const data = await getChatHistory();
  // appendChat({
  //   question: `Did she die by accident? ${Math.round(Math.random() * 100)}`,
  //   answer: "Yes",
  // });
  return (
    <div className="mx-auto max-w-xl grid gap-4">
      <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
      <p className="text-lg text-gray-700">{game.description}</p>
      {/* use `marker:text-gray-700 for decoration */}
      <ol className="grid gap-3 list-decimal list-inside text-gray-900">
        {data.map(({ question, answer }, i) => (
          <li key={i}>
            <span className="text-gray-700 font-light">{question}</span>
            <span className="pl-1">{answer}</span>
          </li>
        ))}
      </ol>
      <Form />
    </div>
  );
}
