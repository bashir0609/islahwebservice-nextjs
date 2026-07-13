import { NextResponse } from "next/server";
import { callGroq, parseGroqJson } from "@/lib/groq";
import { getErrorMessage } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { apiKey, model, topic, count = 8 } = await req.json();
    if (!apiKey || !model || !topic) {
      return NextResponse.json({ error: "Missing apiKey, model or topic" }, { status: 400 });
    }

    const system = `You are an SEO keyword researcher for a B2B services agency that specializes in:
- Verified B2B Contact Lists
- Lead Generation Analysis
- Business Process Automation
Generate unique, high-intent keyword phrases relevant to these services.`;

    const user = `Topic: ${topic}
Generate ${count} unique, specific keyword phrases directly related to this B2B topic and our services.
Return only a JSON array of strings, no explanation. Example: ["keyword 1", "keyword 2"]`;

    const raw = await callGroq({ apiKey, model, systemPrompt: system, userPrompt: user });
    const parsed = parseGroqJson<string[]>(raw);
    return NextResponse.json({ keywords: parsed });
  } catch (e: unknown) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}
