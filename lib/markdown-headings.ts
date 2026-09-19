export interface MarkdownHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractMarkdownHeadings(content: string): MarkdownHeading[] {
  const seen = new Map<string, number>();
  return [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
    const text = match[2].replace(/\s+#+$/, "").trim();
    const base = headingId(text) || "section";
    const occurrence = seen.get(base) || 0;
    seen.set(base, occurrence + 1);
    return {
      id: occurrence ? `${base}-${occurrence + 1}` : base,
      text,
      level: match[1].length as 2 | 3,
    };
  });
}

export function splitBeforeFirstH2(content: string): [string, string] {
  const match = content.match(/^##\s+/m);
  if (!match || match.index === undefined) return [content, ""];
  return [content.slice(0, match.index).trimEnd(), content.slice(match.index)];
}
