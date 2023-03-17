import { promptKeyBySlug } from "@/lib/prompt";
import { redis } from "@/lib/upstash";
import { ChatInteraction } from "@/types";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function OG(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  // REMINDER: either get the cookie token from user or the searchParam _token
  const _token = req.cookies.get("token")?.value || searchParams.get("_token");
  const slug = searchParams.get("slug");
  const title = searchParams.get("title");
  const key = slug && _token ? promptKeyBySlug(slug, _token) : undefined;
  const data = key
    ? ((await redis.zrange(key, 0, -1)) as ChatInteraction[])
    : undefined;
  console.log({ _token, slug, title, data });
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="bg-gray-900 flex flex-col w-full h-full items-center justify-center">
          <h2 tw="text-gray-200 text-5xl">
            Black Stories {title ? `- ${title}` : undefined}
          </h2>
          {/* <p tw="text-gray-400 text-lg">OSS - Powered by Vercel and OpenAI</p> */}
          <ul tw="flex">
            {data?.map(({ answer }, i) => {
              switch (answer) {
                case "Yes":
                  return (
                    <li key={i} tw="text-green-500 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </li>
                  );
                case "No":
                  return (
                    <li key={i} tw="text-red-500 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </li>
                  );
                case "N/A":
                  return (
                    <li key={i} tw="text-gray-500 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </li>
                  );
                case "Solved":
                  return (
                    <li key={i} tw="text-green-500 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5.8 11.3 2 22l10.7-3.79"></path>
                        <path d="M4 3h.01"></path>
                        <path d="M22 8h.01"></path>
                        <path d="M15 2h.01"></path>
                        <path d="M22 20h.01"></path>
                        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
                        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
                        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
                        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
                      </svg>
                    </li>
                  );
              }
            })}
          </ul>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
