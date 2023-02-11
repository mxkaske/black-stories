import { Redis } from "@upstash/redis";

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error(
    "Missing Environment Variable UPSTASH_REDIS_REST_URL and/or UPSTASH_REDIS_REST_TOKEN"
  );
}

export const redis = Redis.fromEnv();
