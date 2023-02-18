import { redis } from "@/lib/upstash";
import { generatePromptBySlug, promptKeyBySlug } from "@/lib/prompt";
import { NextRequest } from "next/server";

// REMINDER: timeout for serverless functions on vercel hobby plan is 10 seconds
// REMINDER: timeout for edge functions on vercel hobby plan is 30 seconds

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextRequest) => {
  try {
    // REMINDER: if cookie does not exist, create a random uuid
    const token = req.cookies.get("token")?.value || crypto.randomUUID();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return new Response("Bad Request", { status: 400 });
    }
    // TODO: add token
    const key = promptKeyBySlug(slug);

    switch (req.method) {
      case "POST": {
        const { question } = (await req.json()) as { question?: string };
        if (!question) {
          return new Response("Bad Request", { status: 400 });
        }

        const prompt = generatePromptBySlug(slug, question);

        const payload = {
          model: "text-davinci-003",
          prompt,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 2048,
          n: 1,
        };

        const response = await fetch("https://api.openai.com/v1/completions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
          },
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (!response.body) {
          return new Response("Bad Request", { status: 500 });
        }

        const json = await response.json();
        // `data` = "answer,significance"
        const data = json.choices[0].text;

        const [answer, significance] = data?.split(",") || ["N/A", 0];

        // append to redis chat history
        await redis.zadd(key, {
          score: Date.now(),
          member: { question, answer, significance },
        });

        // expire key after 10 hours
        await redis.expire(key, 36000); // 60s * 60min * 10h

        return new Response(
          JSON.stringify({ question, answer, significance }),
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Set-Cookie": `token=${token}; Max-Age=${36000}; Path=${"/"}`,
            },
          }
        );
      }
      case "DELETE": {
        await redis.del(key);
        return new Response("Deleted", { status: 202 });
      }
      default: {
        return new Response("Method Not Allowed", { status: 405 });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
};

export default handler;
