import { createCompletion } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/upstash";
import { generatePromptBySlug, promptKeyBySlug } from "@/lib/prompt";

// REMINDER: timeout for serverless functions on vercel hobby plan is 10 seconds
// REMINDER: timeout for edge functions on vercel hobby plan is 30 seconds
// DISCUSS: whether to move function to the edge or not! BUT: axios error on the edge if using node sdk
// the solution would be to make an HTTP API request instead

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query as { slug: string };
    const key = promptKeyBySlug(slug);
    switch (req.method) {
      case "POST": {
        const { question } = req.body as {
          question?: string;
        };

        if (!question) {
          return res.status(400).end("Bad Request");
        }

        const prompt = generatePromptBySlug(slug, question);
        const response = await createCompletion(prompt);
        const data = response.data.choices[0].text;

        // append to redis chat history
        await redis.zadd(key, {
          score: Date.now(),
          member: {
            question,
            answer: data || "N/A",
          },
        });
        // expire key after 10 hours
        await redis.expire(key, 36000); // 60s * 60min * 10h

        return res.json({ data });
      }
      case "DELETE": {
        await redis.del(key);
        return res.status(202).end();
      }
      default: {
        return res.status(405).end("Method Not Allowed");
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;