const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function callGroq({
  apiKey,
  model,
  systemPrompt,
  userPrompt,
  temperature = 0.7,
  maxTokens = 4096,
}: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq API error: ${res.status} — ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export const DEFAULT_MODELS = [
  { value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B Versatile" },
  { value: "llama-3.3-8b-versatile", label: "Llama 3.3 8B Versatile" },
  { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B (32K)" },
  { value: "gemma2-9b-it", label: "Gemma 2 9B" },
  { value: "llama-guard-3-8b", label: "Llama Guard 3 8B" },
];
