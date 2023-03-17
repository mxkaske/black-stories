import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// https://nextjs.org/docs/messages/middleware-upgrade-guide#how-to-upgrade-4
const PATTERNS = [
  [
    // @ts-expect-error cannot find ts type
    new URLPattern({ pathname: "/game/:slug" }),
    // @ts-expect-error cannot find ts type
    ({ pathname }) => pathname.groups,
  ],
];

const params = (url: string) => {
  const input = url.split("?")[0];
  let result = {};

  for (const [pattern, handler] of PATTERNS) {
    const patternResult = pattern.exec(input);
    if (patternResult !== null && "pathname" in patternResult) {
      result = handler(patternResult);
      break;
    }
  }
  return result;
};

// TODO: if already _token exists (for shareable OG-Image), we will need to overwrite it!

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const _token = url.searchParams.get("_token");
  const { slug } = params(request.url) as { slug?: string };
  const token = request.cookies.get("token");
  if (_token) {
    // REMINDER: comment on development
    url.searchParams.delete("_token");
    return NextResponse.redirect(url); // difference to `.rewrite` - could be a tweet
  }
  // if (token && !_token) {
  //   url.searchParams.set("_token", token.value);
  //   return NextResponse.rewrite(url);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/:slug*",
};
