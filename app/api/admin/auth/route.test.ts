import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown, raw = false) {
  return new NextRequest("http://localhost/api/admin/auth", {
    method: "POST",
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

describe("POST /api/admin/auth", () => {
  const originalPassword = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    delete process.env.ADMIN_PASSWORD;
  });

  afterEach(() => {
    if (originalPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = originalPassword;
  });

  it("accepts the configured admin password and sets an auth cookie", async () => {
    process.env.ADMIN_PASSWORD = "s3cret";

    const res = await POST(makeRequest({ password: "s3cret" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });

    const cookie = res.cookies.get("admin_auth");
    expect(cookie?.value).toBe("true");
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.maxAge).toBe(60 * 60 * 24);
  });

  it("falls back to the default password when none is configured", async () => {
    const res = await POST(makeRequest({ password: "admin123" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
  });

  it("rejects an incorrect password with 401", async () => {
    process.env.ADMIN_PASSWORD = "s3cret";

    const res = await POST(makeRequest({ password: "wrong" }));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Invalid password" });
    expect(res.cookies.get("admin_auth")).toBeUndefined();
  });

  it("returns 500 when the request body is not valid JSON", async () => {
    const res = await POST(makeRequest("not json", true));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Authentication failed" });
  });
});
