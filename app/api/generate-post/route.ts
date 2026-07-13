import { NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { apiKey, model, keywords, tone = "professional", wordCount = 1200 } = await req.json();
    if (!apiKey || !model || !keywords?.length) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const serviceKeywords = [
      "Verified B2B Contact Lists",
      "Lead Generation Analysis",
      "Business Process Automation",
    ].join(", ");

    const system = `You are a professional B2B content writer for "Islah Web Service" — a leading agency in ${serviceKeywords}. Write in a ${tone} tone with clear value-driven insights.`;

    const prompt = `Write a comprehensive blog post about: ${keywords.join(", ")}.
Word count target: ${wordCount} words.
Format as JSON with the following structure:
{
  "title": "Engaging title",
  "excerpt": "Short summary (max 160 chars)",
  "content": "Full blog post content with headings and markup",
  "tags": ["tag1", "tag2"],
  "readTime": 6
}
Use markdown inside the content field.`;

    const raw = await callGroq({ apiKey, model, systemPrompt: system, userPrompt: prompt, maxTokens: 9000 });
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ post: parsed });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
