import { NextRequest } from "next/server";
import { getMachineIndex } from "@/lib/machine-index";

export async function GET(request: NextRequest) {
  const entries = await getMachineIndex();
  const sections: string[] = [];
  let bytes = 0;
  for (const entry of entries) {
    const url = new URL("/api/render-md", request.url);
    url.searchParams.set("path", entry.path);
    const response = await fetch(url, {
      headers: { Accept: "text/markdown" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || !response.headers.get("content-type")?.includes("text/markdown")) {
      return new Response("Full index temporarily unavailable", { status: 503 });
    }
    const section = await response.text();
    bytes += Buffer.byteLength(section, "utf8") + 7;
    if (bytes > 1024 * 1024) {
      return new Response("Full index exceeds 1 MiB; use /llms.txt for individual pages.", { status: 413 });
    }
    sections.push(section);
  }
  return new Response(sections.join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
