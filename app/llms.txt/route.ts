// llms.txt — machine-readable site index for LLM crawlers.
// Spec: https://llmstxt.org/
// Kept concise. Agents that obey this file should also read /robots.txt.
export async function GET() {
  const content = `# Islah Web Service

> Custom B2B prospect-list research built around your ICP. Research service, not a software platform.

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

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
