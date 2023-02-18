import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function () {
  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
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
          <h2 tw="text-gray-200 text-5xl">Black Stories</h2>
          <p tw="text-gray-400 text-lg">OSS - Powered by Vercel and OpenAI</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
