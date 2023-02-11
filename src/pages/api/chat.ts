import { createCompletion } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/upstash";
import { generatePrompt } from "@/lib/prompt";
import { gameIdKey } from "@/lib/redis/keys";

// REMINDER: timeout for serverless functions on vercel hobby plan is 10 seconds
// REMINDER: timeout for edge functions on vercel hobby plan is 30 seconds
// DISCUSS: whether to move function to the edge or not! BUT: axios error on the edge if using node sdk
// the solution would be to make an HTTP API request instead

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { question } = req.body as {
    question?: string;
  };
  console.log(req.body);

  if (!question) {
    return res.status(400).end("Bad Request");
  }

  const prompt = generatePrompt(question);
  const response = await createCompletion(prompt);
  const data = response.data.choices[0].text;

  // append to redis chat history
  await redis.zadd(gameIdKey, {
    score: Date.now(),
    member: {
      question,
      answer: data || "N/A",
    },
  });

  return res.json({ data });
};

export default handler;
