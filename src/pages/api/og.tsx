import { promptKeyBySlug } from "@/lib/prompt";
import { redis } from "@/lib/upstash";
import { ChatInteraction } from "@/types";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
// MOCK DATA
// import { data } from "@/lib/mock";

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
  const url = `black-stories.vercel.app${slug ? `/${slug}` : ""}`;
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
          padding: "2rem",
          backgroundImage:
            "linear-gradient(to bottom right, #0f172a 60%, #64748b)",
        }}
      >
        <div tw="flex p-8">
          <p tw="text-slate-200 text-3xl">Black Stories</p>
        </div>
        <div tw="flex-1 flex flex-col w-full h-full justify-center p-8">
          <p tw="text-slate-200 text-5xl mb-2">{title}</p>
          <p tw="text-slate-400 text-3xl mb-8">Find out what happened!</p>
          <ul tw="flex items-center flex-wrap">
            {data?.map(({ answer }, i) => {
              return (
                <li key={i} tw="mb-2">
                  {renderIcon(answer)}
                  {i !== data.length - 1 ? (
                    <div tw="flex self-center h-1 w-8 bg-slate-600 rounded mx-1" />
                  ) : undefined}
                </li>
              );
            })}
          </ul>
        </div>
        <div tw="flex p-8">
          <p tw="text-slate-400 text-2xl">{url}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

function renderIcon(answer: ChatInteraction["answer"]) {
  switch (answer) {
    case "Yes":
      return (
        <div tw="flex text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
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
        </div>
      );
    case "No":
      return (
        <div tw="flex text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
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
        </div>
      );
    case "N/A":
      return (
        <div tw="flex text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
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
        </div>
      );
    case "Solved":
      return (
        <div tw="flex text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
        </div>
      );
  }
}
