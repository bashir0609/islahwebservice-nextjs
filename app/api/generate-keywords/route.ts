import { NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { apiKey, model, topic, count = 8 } = await req.json();
    const resolvedApiKey = apiKey || process.env.GROQ_API_KEY;
    if (!resolvedApiKey || !model || !topic) {
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

    const raw = await callGroq({ apiKey: resolvedApiKey, model, systemPrompt: system, userPrompt: user });
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as string[];
    return NextResponse.json({ keywords: parsed });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
