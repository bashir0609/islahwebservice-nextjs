import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { callGroq, DEFAULT_MODELS } from "./groq";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const baseArgs = {
  apiKey: "test-key",
  model: "llama-3.3-70b-versatile",
  systemPrompt: "You are helpful.",
  userPrompt: "Say hi.",
};

describe("callGroq", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("posts to the Groq endpoint with auth header and message payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "Hi there" } }] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await callGroq(baseArgs);

    expect(result).toBe("Hi there");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(GROQ_API_URL);
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer test-key");
    expect(options.headers["Content-Type"]).toBe("application/json");

    const body = JSON.parse(options.body);
    expect(body.model).toBe(baseArgs.model);
    expect(body.messages).toEqual([
      { role: "system", content: baseArgs.systemPrompt },
      { role: "user", content: baseArgs.userPrompt },
    ]);
    expect(body.temperature).toBe(0.7);
    expect(body.max_tokens).toBe(4096);
  });

  it("forwards custom temperature and maxTokens", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "ok" } }] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await callGroq({ ...baseArgs, temperature: 0.1, maxTokens: 128 });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.temperature).toBe(0.1);
    expect(body.max_tokens).toBe(128);
  });

  it("returns an empty string when the response has no content", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    expect(await callGroq(baseArgs)).toBe("");
  });

  it("throws an error including status and body when the request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => "rate limited",
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(callGroq(baseArgs)).rejects.toThrow(
      "Groq API error: 429 — rate limited"
    );
  });
});

describe("DEFAULT_MODELS", () => {
  it("exposes non-empty value/label pairs", () => {
    expect(DEFAULT_MODELS.length).toBeGreaterThan(0);
    for (const model of DEFAULT_MODELS) {
      expect(typeof model.value).toBe("string");
      expect(model.value.length).toBeGreaterThan(0);
      expect(typeof model.label).toBe("string");
      expect(model.label.length).toBeGreaterThan(0);
    }
  });

  it("has unique model values", () => {
    const values = DEFAULT_MODELS.map((m) => m.value);
    expect(new Set(values).size).toBe(values.length);
  });
});
