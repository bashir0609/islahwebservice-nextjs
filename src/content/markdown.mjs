export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function safeUrl(value) {
  if (typeof value !== 'string' || /[\s\u0000-\u001f\u007f\\]/u.test(value)) return null;
  if (/^\/(?!\/)/.test(value) || /^#[A-Za-z0-9_-]+$/.test(value)) return value;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? value : null; }
  catch { return null; }
}

// Restricted Markdown: raw HTML is always text, and only our own allowlisted tags
// are emitted. Unsupported extensions remain literal rather than becoming HTML.
function inline(source) {
  const pattern = /(`[^`\n]+`|!?\[[^\]\n]*\]\([^\s)]+\)|\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g;
  let result = '', position = 0;
  for (const match of source.matchAll(pattern)) {
    result += escapeHtml(source.slice(position, match.index));
    const token = match[0];
    const link = token.match(/^(!?)\[([^\]]*)\]\(([^)]+)\)$/);
    if (link) {
      const url = safeUrl(link[3]);
      result += !url ? escapeHtml(token) : link[1]
        ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(link[2])}" loading="lazy" decoding="async">`
        : `<a href="${escapeHtml(url)}" rel="noopener noreferrer">${escapeHtml(link[2])}</a>`;
    } else if (token.startsWith('`')) result += `<code>${escapeHtml(token.slice(1, -1))}</code>`;
    else if (token.startsWith('**')) result += `<strong>${escapeHtml(token.slice(2, -2))}</strong>`;
    else result += `<em>${escapeHtml(token.slice(1, -1))}</em>`;
    position = match.index + token.length;
  }
  return result + escapeHtml(source.slice(position));
}

export function renderMarkdown(markdown) {
  if (typeof markdown !== 'string' || markdown.length > 1_000_000) throw new Error('Invalid editorial Markdown');
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');
  const output = [];
  let paragraph = [], code = null, list = null;
  const flush = () => { if (paragraph.length) output.push(`<p>${inline(paragraph.join('\n'))}</p>`); paragraph = []; };
  const closeList = () => { if (list) output.push(`</${list}>`); list = null; };
  for (const line of lines) {
    if (/^```/.test(line)) { flush(); closeList(); if (code === null) code = []; else { output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = null; } continue; }
    if (code !== null) { code.push(line); continue; }
    if (!line.trim()) { flush(); closeList(); continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    const item = line.match(/^\s*(?:([-*+])|\d+\.)\s+(.+)$/);
    if (heading) { flush(); closeList(); const level = Math.max(2, heading[1].length); output.push(`<h${level}>${inline(heading[2])}</h${level}>`); }
    else if (item) { flush(); const type = item[1] ? 'ul' : 'ol'; if (list !== type) { closeList(); list = type; output.push(`<${type}>`); } output.push(`<li>${inline(item[2])}</li>`); }
    else if (/^>\s?/.test(line)) { flush(); closeList(); output.push(`<blockquote><p>${inline(line.replace(/^>\s?/, ''))}</p></blockquote>`); }
    else { closeList(); paragraph.push(line); }
  }
  flush(); closeList();
  if (code !== null) output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  return output.join('\n');
}
