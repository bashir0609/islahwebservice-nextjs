import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET environment variable is not set (or too short)"
    );
  }
  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Creates a signed, tamper-proof admin session token of the form
 * `<base64url(payload)>.<base64url(hmac)>`.
 */
export async function createAdminSession(
  maxAgeSeconds: number = ADMIN_SESSION_MAX_AGE
): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ exp: Date.now() + maxAgeSeconds * 1000 }))
  );
  const key = await importKey(getSecret());
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
  );
  return `${payload}.${toBase64Url(signature)}`;
}

/**
 * Verifies a session token's signature and expiry. Never throws.
 */
export async function verifyAdminSession(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  try {
    const key = await importKey(getSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!valid) return false;

    const parsed = JSON.parse(decoder.decode(fromBase64Url(payload))) as {
      exp?: number;
    };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

/**
 * Reads the session cookie (server components / route handlers / server
 * actions) and returns whether the caller is an authenticated admin.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_COOKIE_NAME)?.value);
}

/**
 * Guard for privileged server actions. Throws when the caller is not an
 * authenticated admin.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}
