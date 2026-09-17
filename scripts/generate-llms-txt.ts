import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { blogPosts, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.islahwebservice.com";

async function generateLlmsTxt() {
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.createdAt));
  const projects = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));

  let content = `# islahwebservice.com\n\n`;
  content += `> B2B lead generation services built around accurate prospect data. We research target companies, identify relevant decision-makers, enrich and verify contact information, and deliver CRM-ready prospect databases built around your targeting criteria.\n\n`;
  content += `Islah Web Service provides the research and data stage of B2B lead generation: company research, decision-maker discovery, contact enrichment, email verification, data cleaning, and CRM-ready delivery. Founded in 2016, the company serves managed service providers (MSPs), SaaS companies, recruitment firms, and B2B professional services across the USA, UK, and Australia. We build the data — your team controls the outreach.\n\n`;
  content += `Key facts:\n`;
  content += `- Founded: 2016\n`;
  content += `- Markets: USA, UK, Australia\n`;
  content += `- Clients: MSPs, SaaS, recruitment firms, professional services, B2B sales teams\n`;
  content += `- Core service: B2B prospect research (one service, applied across industries)\n`;
  content += `- Contact: hello@islahwebservice.com · +1 (442) 222-8258\n\n`;

  // Services
  content += `## Services\n`;
  content += `- [B2B Prospect Research](${SITE_URL}/b2b-prospect-research): The core service — companies researched against your criteria, requested decision-makers identified, and contact data enriched, verified, and delivered CRM-ready.\n`;
  content += `- [Existing Database Enrichment](${SITE_URL}/contact-enrichment): Complete and clean an existing prospect or CRM list — missing emails, phone numbers, LinkedIn URLs, updated titles, verification, and deduplication.\n\n`;

  // Industries
  content += `## Industries\n`;
  content += `- [Managed Service Providers](${SITE_URL}/industries/msp): MSP lead generation services built on targeted company research by geography, size, and IT-related criteria.\n`;
  content += `- [SaaS Companies](${SITE_URL}/industries/saas): SaaS lead generation services built on accurate prospect data — stack, funding, and growth signals.\n`;
  content += `- [Recruitment Firms](${SITE_URL}/industries/recruitment): Recruitment lead generation built around hiring signals.\n`;
  content += `- [Professional Services](${SITE_URL}/industries/professional-services): Lead generation research for consultancies, agencies, and advisory firms.\n`;
  content += `- [Real Estate](${SITE_URL}/industries/real-estate): Lead generation built on property and company research.\n\n`;

  // Guides (blog posts)
  content += `## Guides\n`;
  for (const post of posts) {
    content += `- [${post.title}](${SITE_URL}/blog/${post.slug})\n`;
  }
  content += `\n`;

  // Case Studies (portfolio)
  content += `## Case Studies\n`;
  for (const project of projects) {
    content += `- [${project.title}](${SITE_URL}/portfolio/${project.slug})\n`;
  }
  content += `\n`;

  // Company
  content += `## Company\n`;
  content += `- [Home](${SITE_URL}/): B2B lead generation services built around accurate prospect data.\n`;
  content += `- [About](${SITE_URL}/about): Our story, mission, values, and impact since 2016.\n`;
  content += `- [Services](${SITE_URL}/services): One core service — B2B prospect research — plus existing database enrichment.\n`;
  content += `- [Industries](${SITE_URL}/industries): B2B lead generation by industry.\n`;
  content += `- [Portfolio](${SITE_URL}/portfolio): Client case studies and delivered research projects.\n`;
  content += `- [Blog](${SITE_URL}/blog): The Islah Journal — expert insights for B2B growth teams.\n`;
  content += `- [Request a Free Sample](${SITE_URL}/request-sample): Get a free sample of prospect research for your criteria.\n`;
  content += `- [Free Consultation](${SITE_URL}/free-consultation): Optional, no-obligation research scoping call.\n`;
  content += `- [Contact](${SITE_URL}/contact): Get in touch with the Islah Web Service team.\n`;
  content += `- [Author: Bashir Ahmed](${SITE_URL}/authors/bashir-ahmed): Founder and author of all research guides.\n`;

  const outputPath = path.join(process.cwd(), "public", "llms.txt");
  await fs.writeFile(outputPath, content, "utf-8");
  console.log(`Generated llms.txt at ${outputPath}`);
  console.log(`Total URLs: ${2 + 5 + posts.length + projects.length + 10} (services + industries + guides + case studies + company)`);
}

generateLlmsTxt().catch(console.error);