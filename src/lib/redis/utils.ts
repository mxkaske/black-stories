import { NextApiRequest } from "next";

export function getIP(req: Request | NextApiRequest) {
  const xff =
    req instanceof Request
      ? req.headers.get("x-forwarded-for")
      : req.headers["x-forwarded-for"];

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(",")[0]) : "127.0.0.1";
}
