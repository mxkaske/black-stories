import { createCompletion } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/upstash";
import { generatePromptBySlug, promptKeyBySlug } from "@/lib/prompt";

// REMINDER: timeout for serverless functions on vercel hobby plan is 10 seconds
// REMINDER: timeout for edge functions on vercel hobby plan is 30 seconds
// DISCUSS: whether to move function to the edge or not! BUT: axios error on the edge if using node sdk
// the solution would be to make an HTTP API request instead

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { question, slug } = req.body as {
    question?: string;
    slug?: string;
  };

  if (!question || !slug) {
    return res.status(400).end("Bad Request");
  }

  const prompt = generatePromptBySlug(slug, question);
  const response = await createCompletion(prompt);
  const data = response.data.choices[0].text;

  // append to redis chat history
  const key = promptKeyBySlug(slug);
  await redis.zadd(key, {
    score: Date.now(),
    member: {
      question,
      answer: data || "N/A",
    },
  });

  return res.json({ data });
};

export default handler;
