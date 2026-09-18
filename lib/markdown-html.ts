import { parseDocument } from "htmlparser2";

type HtmlNode = ReturnType<typeof parseDocument>["children"][number];
type HtmlElement = Extract<HtmlNode, { attribs: Record<string, string> }>;

const excludedTags = new Set([
  "script", "style", "noscript", "template", "svg", "canvas", "nav", "footer",
  "button", "input", "select", "textarea",
]);
const excludedRoles = new Set(["navigation", "contentinfo", "banner", "button"]);
const blockTags = new Set([
  "address", "article", "aside", "section", "main", "header", "div", "p",
  "figure", "figcaption", "dl", "dt", "dd", "details", "summary", "form",
]);

function isElement(node: HtmlNode): node is HtmlElement {
  return node.type === "tag" || node.type === "script" || node.type === "style";
}

function excluded(node: HtmlElement): boolean {
  return excludedTags.has(node.name) ||
    "data-md-exclude" in node.attribs ||
    "hidden" in node.attribs ||
    node.attribs["aria-hidden"]?.trim().toLowerCase() === "true" ||
    excludedRoles.has(node.attribs.role?.trim().toLowerCase());
}

function block(text: string): string {
  return text.trim() ? `\n\n${text.trim()}\n\n` : "";
}

function inline(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function escapeText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/([*_[\]`])/g, "\\$1");
}

function destination(href: string): string | null {
  const value = href.trim();
  if (!value || /^(?:javascript|data|vbscript):/i.test(value.replace(/\s/g, ""))) return null;
  return value.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")
    .replace(/</g, "%3C").replace(/>/g, "%3E");
}

function findElement(nodes: HtmlNode[], name: string): HtmlElement | undefined {
  for (const node of nodes) {
    if (!isElement(node) || excluded(node)) continue;
    if (node.name === name) return node;
    const found = findElement(node.children, name);
    if (found) return found;
  }
}

// Inline element boundaries can separate CSS-laid-out labels even when SSR emits
// no whitespace. Keep punctuation attached, but never concatenate adjacent words.
function children(nodes: HtmlNode[]): string {
  let result = "";
  let previousWasElement = false;
  for (const node of nodes) {
    const text = render(node);
    if (!text) continue;
    if (result.endsWith(")") && text.startsWith("[")) result += "\n\n";
    if ((previousWasElement || isElement(node)) && /\S$/.test(result) &&
        /^[\p{L}\p{N}\[*_]/u.test(text)) result += " ";
    if (result.endsWith("\n\n") && text.startsWith("\n\n")) result += text.slice(2);
    else result += text;
    previousWasElement = isElement(node);
  }
  return result;
}

function renderList(node: HtmlElement): string {
  let number = Number.parseInt(node.attribs.start || "1", 10);
  if (!Number.isFinite(number)) number = 1;
  const items: string[] = [];
  for (const item of node.children) {
    if (!isElement(item) || item.name !== "li" || excluded(item)) continue;
    const value = Number.parseInt(item.attribs.value, 10);
    if (Number.isFinite(value)) number = value;
    const marker = node.name === "ol" ? `${number++}. ` : "- ";
    const text = children(item.children).trim();
    if (!text) continue;
    items.push(marker + text.replace(/\n/g, `\n${" ".repeat(marker.length)}`));
  }
  return block(items.join("\n"));
}

function renderTable(node: HtmlElement): string {
  const rows: string[][] = [];
  let caption = "";
  function visit(nodes: HtmlNode[]): void {
    for (const child of nodes) {
      if (!isElement(child) || excluded(child)) continue;
      if (child.name === "caption") caption = children(child.children);
      else if (child.name === "tr") {
        rows.push(child.children.filter(isElement)
          .filter((cell) => !excluded(cell) && (cell.name === "th" || cell.name === "td"))
          .map((cell) => inline(children(cell.children)).replace(/\|/g, "\\|")));
      } else if (["thead", "tbody", "tfoot"].includes(child.name)) visit(child.children);
    }
  }
  visit(node.children);
  const width = Math.max(0, ...rows.map((row) => row.length));
  if (!width) return block(caption);
  const line = (row: string[]) => `| ${Array.from({ length: width }, (_, i) => row[i] || "").join(" | ")} |`;
  const first = rows.shift() || [];
  return block(caption) + block([
    line(first), line(Array.from({ length: width }, () => "---")), ...rows.map(line),
  ].join("\n"));
}

function rawText(node: HtmlNode): string {
  if (node.type === "text") return node.data;
  if (!isElement(node) || excluded(node)) return "";
  return node.children.map(rawText).join("");
}

function render(node: HtmlNode): string {
  if (node.type === "text") return escapeText(node.data.replace(/\s+/g, " "));
  if (!isElement(node) || excluded(node)) return "";
  if (node.attribs["data-md-stat"] === "true") {
    return block(`- ${inline(children(node.children)).replace(/#{1,6} /g, "")}`);
  }
  if (node.name === "ul" || node.name === "ol") return renderList(node);
  if (node.name === "table") return renderTable(node);
  if (node.name === "br") return "\n";
  if (node.name === "hr") return block("---");
  if (node.name === "img") return escapeText(node.attribs.alt || "");
  if (node.name === "pre") {
    const text = rawText(node).replace(/^\n|\n$/g, "");
    const fence = "`".repeat(Math.max(3, ...Array.from(text.matchAll(/`+/g), (m) => m[0].length + 1)));
    return block(`${fence}\n${text}\n${fence}`);
  }
  if (node.name === "code") {
    const text = rawText(node);
    const fence = "`".repeat(Math.max(1, ...Array.from(text.matchAll(/`+/g), (m) => m[0].length + 1)));
    return `${fence} ${text} ${fence}`;
  }
  const text = children(node.children);
  if (/^h[1-6]$/.test(node.name)) return block(`${"#".repeat(Number(node.name[1]))} ${inline(text)}`);
  if (node.name === "blockquote") return block(text.trim().split("\n").map((line) => `> ${line}`).join("\n"));
  if (node.name === "a") {
    const href = destination(node.attribs.href || "");
    if (!href || !text.trim()) return text;
    // A card may contain headings and paragraphs: retain those blocks rather
    // than flattening the entire card into a single Markdown link label.
    if (text.includes("\n\n")) return block(`${text.trim()}\n\n[View details](${href})`);
    return `[${inline(text)}](${href})`;
  }
  if (["strong", "b", "em", "i", "del", "s"].includes(node.name)) {
    const marker = ["strong", "b"].includes(node.name) ? "**" : ["del", "s"].includes(node.name) ? "~~" : "*";
    return text.trim() ? `${marker}${text.trim()}${marker}` : "";
  }
  return blockTags.has(node.name) ? block(text) : text;
}

export function htmlMetadata(html: string): { title: string; description: string } {
  const document = parseDocument(html, { decodeEntities: true });
  const title = findElement(document.children, "title");
  let description = "";
  function visit(nodes: HtmlNode[]): void {
    for (const node of nodes) {
      if (!isElement(node)) continue;
      if (node.name === "meta" && node.attribs.name === "description") description = node.attribs.content || "";
      visit(node.children);
    }
  }
  visit(document.children);
  return { title: title ? rawText(title).trim() : "", description };
}

/** Serialize the visible main/body content, pruning explicitly marked UI subtrees. */
export function htmlToMarkdown(html: string): string {
  const document = parseDocument(html, { decodeEntities: true });
  const root = findElement(document.children, "main") || findElement(document.children, "body");
  return children(root ? root.children : document.children)
    .replace(/\n[ \t]+\n/g, "\n\n")
    .trim();
}
