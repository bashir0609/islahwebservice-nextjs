import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

export async function verifyContactRequest(token: string, honeypot: string) {
  if (honeypot) throw new Error("Security check failed.");
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) throw new Error("Contact form is temporarily unavailable.");

  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) throw new Error("Unable to verify request. Please try again.");
  const ipHash = createHash("sha256").update(ip).digest("hex");
  await db.execute(sql`CREATE TABLE IF NOT EXISTS contact_rate_limits (
    ip_hash text PRIMARY KEY, window_start timestamptz NOT NULL DEFAULT now(), attempts integer NOT NULL
  )`);
  const limit = await db.execute(sql`INSERT INTO contact_rate_limits (ip_hash, window_start, attempts)
    VALUES (${ipHash}, now(), 1)
    ON CONFLICT (ip_hash) DO UPDATE SET
      window_start = CASE WHEN contact_rate_limits.window_start < now() - interval '15 minutes' THEN now() ELSE contact_rate_limits.window_start END,
      attempts = CASE WHEN contact_rate_limits.window_start < now() - interval '15 minutes' THEN 1 ELSE contact_rate_limits.attempts + 1 END
    RETURNING attempts`);
  if (Number(limit.rows[0]?.attempts) > 5) throw new Error("Too many attempts. Please try again later.");

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body, cache: "no-store", signal: AbortSignal.timeout(5000),
  }).then((res) => res.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
  if (!verification.success) throw new Error("Security check failed. Please try again.");
}
