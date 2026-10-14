import "server-only";
import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";
const local = new Map<string, { time: string; expires: number }>();
/** Keep notification payloads stable for Resend's 24-hour idempotency window. */
export async function submissionTime(
  kind: string,
  reference: string,
): Promise<string> {
  const key = `stratumgov:submission:${createHash("sha256").update(`${kind}/${reference}`).digest("hex")}`;
  const now = Date.now();
  const timestamp = new Date(now).toISOString();
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const redis = Redis.fromEnv();
    await redis.set(key, timestamp, { nx: true, ex: 86400 });
    const existing = await redis.get<string>(key);
    if (!existing) throw new Error("Submission reference unavailable");
    return existing;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Shared submission reference storage unavailable");
  for (const [id, entry] of local) if (entry.expires <= now) local.delete(id);
  if (!local.has(key))
    local.set(key, { time: timestamp, expires: now + 86400000 });
  return local.get(key)!.time;
}
