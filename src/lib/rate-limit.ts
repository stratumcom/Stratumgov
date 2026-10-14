import "server-only";
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
const buckets = new Map<string, { count: number; reset: number }>();
let limiter: Ratelimit | undefined;
export async function rateLimit(
  request: Request,
  email: string,
): Promise<"allowed" | "limited" | "unavailable"> {
  const production = process.env.NODE_ENV === "production";
  const header = process.env.VERCEL
    ? "x-vercel-forwarded-for"
    : process.env.TRUSTED_CLIENT_IP_HEADER;
  const ip = header
    ? request.headers.get(header)?.split(",")[0].trim()
    : undefined;
  if (production && !ip) return "unavailable";
  const hash = (value: string) =>
    createHash("sha256").update(value).digest("hex");
  const keys = [
    `ip:${hash(ip || "local-development")}`,
    `email:${hash(email.toLowerCase())}`,
  ];
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    limiter ??= new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "stratumgov:enquiries",
      analytics: false,
    });
    try {
      const results = await Promise.all(keys.map((k) => limiter!.limit(k)));
      return results.every((r) => r.success) ? "allowed" : "limited";
    } catch {
      return "unavailable";
    }
  }
  if (production) return "unavailable";
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.reset <= now) buckets.delete(key);
  }
  let limited = false;
  for (const key of keys) {
    const bucket = buckets.get(key) || {
      count: 0,
      reset: now + 15 * 60 * 1000,
    };
    bucket.count++;
    buckets.set(key, bucket);
    if (bucket.count > 5) limited = true;
  }
  return limited ? "limited" : "allowed";
}
