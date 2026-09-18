import { getMachineIndex, type MachineIndexEntry } from "@/lib/machine-index";

// llms.txt — machine-readable site index for LLM crawlers.
// Spec: https://llmstxt.org/
// Kept concise. Agents that obey this file should also read /robots.txt.
export async function GET() {
  const entries = await getMachineIndex();
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  const listed = new Set<string>();
  const summary = `# Islah Web Service

> Custom B2B prospect-list research built around your ICP. Research service, not a software platform.

Islah Web Service researches the companies and decision-makers your sales team wants to reach. Each project is built around your industry, geography, company criteria, desired roles, and required data fields. We Build the Data. Your Team Controls the Outreach.

## Services
- [B2B Prospect Research](https://www.islahwebservice.com/b2b-prospect-research): The core service: companies researched against your criteria, requested decision-makers identified, and contact data enriched, verified, and delivered CRM-ready.
- [Existing Database Enrichment](https://www.islahwebservice.com/contact-enrichment): Already have a list? We complete and clean your existing prospect or CRM data: missing emails, phones, LinkedIn URLs, updated titles, verification, and deduplication.

## Research process
1. Share Your Target Criteria — Provide your existing ICP, target account description, geography, company characteristics, desired titles, and required fields.
2. Refine the Research Brief — We clarify ambiguous criteria, confirm available data sources, define exclusions, and agree on the final deliverable.
3. Research Target Companies — We find companies matching the approved criteria using relevant business sources.
4. Identify Decision-Makers — We locate and verify people matching your requested roles or responsibilities.
5. Enrich and Verify the Data — We add contact details, company fields, LinkedIn profiles, and emails, validating across sources.
6. Clean and Deliver — We deduplicate, standardize, quality-check, and deliver the database in your required format.

## Homepage
- https://www.islahwebservice.com/

## Core service
- https://www.islahwebservice.com/b2b-prospect-research — B2B Prospect Research (company research, decision-maker discovery, contact enrichment, verification, CRM-ready delivery)

## Service application
- https://www.islahwebservice.com/contact-enrichment — Existing Database Enrichment & Contact Data Completion

## Pricing & samples
- https://www.islahwebservice.com/request-sample — Request a Free 20-Record Sample
- https://www.islahwebservice.com/free-consultation — Free strategy consultation (scope, timeline, project-specific quote)

## Industries
- https://www.islahwebservice.com/industries
- https://www.islahwebservice.com/industries/saas
- https://www.islahwebservice.com/industries/msp
- https://www.islahwebservice.com/industries/recruitment
- https://www.islahwebservice.com/industries/professional-services
- https://www.islahwebservice.com/industries/real-estate

## Company
- https://www.islahwebservice.com/about
- https://www.islahwebservice.com/portfolio
- https://www.islahwebservice.com/blog
- https://www.islahwebservice.com/contact

## Legal
- https://www.islahwebservice.com/privacy-policy
- https://www.islahwebservice.com/terms

## Notes
- Research is scoped per project. Pricing is criteria-dependent; request a quote.
- We do not run outreach or deliver booked meetings.
- Contact: hello@islahwebservice.com
`;

  // Keep editorial annotations verbatim, but let the shared index own membership.
  const curated = summary.replace(/^- https:\/\/www\.islahwebservice\.com(\/[^\s]*)?(.*)$/gm, (_line, path = "/", annotation) => {
    const entry = byPath.get(path);
    if (!entry) return "";
    listed.add(path);
    return `- ${entry.url}${path === "/" ? "/" : ""}${annotation}`;
  });
  const remaining = entries.filter((entry) => !listed.has(entry.path));
  const section = (heading: string, items: MachineIndexEntry[]) => {
    if (!items.length) return "";
    return `## ${heading}\n${items.map((entry) => {
      const annotation = [entry.title, entry.description].filter(Boolean).join(" — ").replace(/\s+/g, " ");
      return `- ${entry.url}${annotation ? ` — ${annotation}` : ""}`;
    }).join("\n")}\n\n`;
  };
  const additions =
    section("Guides", remaining.filter((entry) => entry.path.startsWith("/blog/"))) +
    section("Case Studies", remaining.filter((entry) => entry.path.startsWith("/portfolio/"))) +
    section("Other pages", remaining.filter((entry) => !entry.path.startsWith("/blog/") && !entry.path.startsWith("/portfolio/") && !["/services", "/authors/bashir-ahmed"].includes(entry.path)));
  const markdownText = (text: string) => text.replace(/\s+/g, " ").replace(/[\\`*_[\]<>]/g, "\\$&");
  const highlights = (heading: string, items: MachineIndexEntry[]) => {
    if (!items.length) return "";
    return `## ${heading}\n${items.map((entry) =>
      `- [${markdownText(entry.title || entry.path)}](${entry.url})${entry.description ? ` — ${markdownText(entry.description)}` : ""}`
    ).join("\n")}\n\n`;
  };
  // The shared index filters published posts and retains both queries' createdAt DESC order.
  const latest =
    highlights("Latest published posts", entries.filter((entry) => entry.path.startsWith("/blog/")).slice(0, 6)) +
    highlights("Latest case studies", entries.filter((entry) => entry.path.startsWith("/portfolio/")).slice(0, 4));
  const content = curated
    .replace("## Core service\n", "## Core service\n- https://www.islahwebservice.com/services — B2B Research & Data Capabilities\n")
    .replace("## Company\n", "## Company\n- https://www.islahwebservice.com/authors/bashir-ahmed — Bashir Ahmed — Founder\n")
    .replace("## Notes\n", `${latest}${additions}## Notes\n`);

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "index, follow",
    },
  });
}
