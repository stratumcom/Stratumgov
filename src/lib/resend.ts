import "server-only";
import { Resend } from "resend";
import { z } from "zod/v4";
export function emailConfiguration() {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const owner = process.env.OWNER_EMAIL;
  const address = from?.match(/<([^>]+)>/)?.[1] || from;
  return key?.startsWith("re_") &&
    key !== "re_your_api_key_here" &&
    z.email().safeParse(address).success &&
    z.email().safeParse(owner).success &&
    process.env.RESEND_SENDER_VERIFIED === "true"
    ? { client: new Resend(key), from: from!, owner: owner! }
    : null;
}
