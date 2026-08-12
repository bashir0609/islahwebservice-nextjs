export interface RelatedContentLink {
  href: string;
  title: string;
  description: string;
  kind: "service" | "industry";
}

export interface RelatedContent {
  services: Omit<RelatedContentLink, "kind">[];
  industries: Omit<RelatedContentLink, "kind">[];
}

// One core service plus its distinct existing-database application. The former
// stage-of-service pages (prospect list building, decision maker research)
// were consolidated into /b2b-prospect-research and 301 there.
const SERVICE = {
  b2b: {
    href: "/b2b-prospect-research",
    title: "B2B Prospect Research",
    description:
      "B2B prospect research: companies researched against your criteria, requested decision-makers identified, and contact details enriched, verified, and delivered CRM-ready.",
  },
  enrichment: {
    href: "/contact-enrichment",
    title: "Existing Database Enrichment",
    description:
      "Complete and clean an existing list: missing emails, phone numbers, LinkedIn URLs, updated titles, verification, and deduplication.",
  },
} as const;

const INDUSTRY = {
  msp: {
    href: "/industries/msp",
    title: "Managed Service Providers",
    description:
      "Prospect lists for MSPs built around IT, cloud, and cybersecurity research signals.",
  },
  saas: {
    href: "/industries/saas",
    title: "SaaS Companies",
    description:
      "Data for SaaS sales teams researching software companies by stack, size, and growth signals.",
  },
  recruitment: {
    href: "/industries/recruitment",
    title: "Recruitment Firms",
    description:
      "Contact databases for staffing firms targeting HR and talent acquisition leaders.",
  },
  professionalServices: {
    href: "/industries/professional-services",
    title: "Professional Services",
    description:
      "Verified contacts for consultancies, agencies, and advisory firms.",
  },
} as const;

export const RELATED_CONTENT_BY_POST: Record<string, RelatedContent> = {
  "sales-prospecting-playbook": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
  },
  "cold-email-for-b2b-lead-generation": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.recruitment],
  },
  "complete-guide-to-b2b-lead-generation": {
    services: [SERVICE.b2b, SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.msp, INDUSTRY.saas],
  },
  "contact-enrichment-guide": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.recruitment, INDUSTRY.professionalServices],
  },
  "email-verification-guide": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
  },
  "how-to-build-a-clean-b2b-lead-list-for-cold-email": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.saas],
  },
  "how-to-build-b2b-prospect-lists": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.saas],
  },
  "how-to-extract-verified-leads-from-google-maps-ethically": {
    services: [SERVICE.enrichment, SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.professionalServices],
  },
  "linkedin-outreach-for-b2b-sales": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.professionalServices],
  },
  "msp-lead-generation-guide": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.msp],
  },
  "b2b-lead-scoring-guide": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.msp, INDUSTRY.saas],
  },
  "what-is-b2b-data-enrichment-complete-guide-for-sales-teams": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.saas],
  },
  "what-is-b2b-lead-generation-a-2026-guide-for-growth-teams": {
    services: [SERVICE.b2b, SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.saas, INDUSTRY.msp],
  },
};

/** Fallback used for any post without a curated mapping (e.g. future posts). */
export const DEFAULT_RELATED_CONTENT: RelatedContent = {
  services: [SERVICE.b2b, SERVICE.b2b],
  industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
};

/**
 * Service/industry mappings keyed by portfolio case-study slug, so case-study
 * pages get reciprocal links to the services and industries they demonstrate.
 */
export const RELATED_CONTENT_BY_PORTFOLIO: Record<string, RelatedContent> = {
  "b2b-lead-generation-manufacturing-software": {
    services: [SERVICE.b2b, SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.saas],
  },
  "cold-email-ready-list-cybersecurity-msp": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.msp],
  },
  "contact-enrichment-uk-consultancy": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.professionalServices],
  },
  "crm-ready-prospect-database-staffing": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.recruitment],
  },
  "decision-maker-research-software-reseller": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.saas],
  },
  "msp-prospect-database-us-it-provider": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.msp],
  },
  "professional-services-contact-enrichment": {
    services: [SERVICE.enrichment, SERVICE.b2b],
    industries: [INDUSTRY.professionalServices],
  },
  "recruitment-decision-maker-list": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.recruitment],
  },
  "saas-lead-generation-uk-analytics-platform": {
    services: [SERVICE.b2b, SERVICE.b2b],
    industries: [INDUSTRY.saas],
  },
  "verified-contact-list-australian-saas": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.saas],
  },
};

export function getRelatedContent(slug: string): RelatedContent {
  return (
    RELATED_CONTENT_BY_PORTFOLIO[slug] ??
    RELATED_CONTENT_BY_POST[slug] ??
    DEFAULT_RELATED_CONTENT
  );
}

export interface RelatedGuide {
  href: string;
  title: string;
  description: string;
}

const GUIDE = {
  mspLeadGen: {
    href: "/blog/msp-lead-generation-guide",
    title: "MSP Lead Generation: Researching Companies With IT-Related Signals",
    description:
      "Research companies with IT-related signals, map the right decision makers, and build verified prospect lists for targeted outreach.",
  },
  completeB2B: {
    href: "/blog/complete-guide-to-b2b-lead-generation",
    title: "The Complete Guide to B2B Lead Generation",
    description:
      "The complete playbook — from defining target criteria to delivering CRM-ready prospect lists with verified decision makers.",
  },
  coldEmail: {
    href: "/blog/cold-email-for-b2b-lead-generation",
    title: "Cold Email for B2B Lead Generation: From First Send to First Reply",
    description:
      "Run campaigns that actually get replies — verified prospect data, subject lines, and sequences that earn responses.",
  },
  prospectLists: {
    href: "/blog/how-to-build-b2b-prospect-lists",
    title: "How to Build Targeted B2B Prospect Lists",
    description:
      "A step-by-step guide to building targeted prospect lists — research, filtering, and verification that delivers CRM-ready data.",
  },
  cleanList: {
    href: "/blog/how-to-build-a-clean-b2b-lead-list-for-cold-email",
    title: "How to Build a Clean B2B Lead List for Cold Email",
    description:
      "Learn how clean, verified lead lists improve cold email campaigns and reduce bounced emails.",
  },
  emailVerify: {
    href: "/blog/email-verification-guide",
    title: "Email Verification: How to Cut Bounce Rates Before You Send",
    description:
      "Why email verification is non-negotiable, how addresses are classified, and how clean lists protect your domain reputation.",
  },
  enrichment: {
    href: "/blog/contact-enrichment-guide",
    title: "Contact Enrichment: How to Complete and Verify B2B Contact Data",
    description:
      "What contact enrichment is, which data fields matter most, and how verification separates valid, risky, and invalid addresses.",
  },
  dataEnrichment: {
    href: "/blog/what-is-b2b-data-enrichment-complete-guide-for-sales-teams",
    title: "What Is B2B Data Enrichment? Complete Guide for Sales Teams",
    description:
      "Turn incomplete prospect lists into accurate, verified, CRM-ready data — improving targeting, deliverability, and outreach.",
  },
  prospecting: {
    href: "/blog/sales-prospecting-playbook",
    title: "The B2B Sales Prospecting Playbook",
    description:
      "A step-by-step playbook for finding accounts that match your target criteria and identifying the right contacts.",
  },
  linkedin: {
    href: "/blog/linkedin-outreach-for-b2b-sales",
    title: "LinkedIn Outreach for B2B Sales",
    description:
      "Find the right decision makers, personalize at scale, and get replies instead of ignored connection requests.",
  },
  leadScoring: {
    href: "/blog/b2b-lead-scoring-guide",
    title: "B2B Lead Scoring: How to Rank Prospects and Prioritize",
    description:
      "Build a lead scoring model — fit, behavior, and signals — so your team works the highest-value accounts first.",
  },
  maps: {
    href: "/blog/how-to-extract-verified-leads-from-google-maps-ethically",
    title: "How to Extract Verified Leads from Google Maps (Ethically)",
    description:
      "The ethical workflow for turning local business research into verified, CRM-ready leads.",
  },
} as const;

/** Curated guides that pair with each case study, so readers can go deeper. */
export const RELATED_GUIDES_BY_PORTFOLIO: Record<string, RelatedGuide[]> = {
  "b2b-lead-generation-manufacturing-software": [
    GUIDE.completeB2B,
    GUIDE.prospectLists,
    GUIDE.prospecting,
  ],
  "cold-email-ready-list-cybersecurity-msp": [
    GUIDE.coldEmail,
    GUIDE.emailVerify,
    GUIDE.cleanList,
  ],
  "contact-enrichment-uk-consultancy": [
    GUIDE.enrichment,
    GUIDE.dataEnrichment,
    GUIDE.emailVerify,
  ],
  "crm-ready-prospect-database-staffing": [
    GUIDE.prospectLists,
    GUIDE.completeB2B,
    GUIDE.cleanList,
  ],
  "decision-maker-research-software-reseller": [
    GUIDE.prospecting,
    GUIDE.linkedin,
    GUIDE.completeB2B,
  ],
  "msp-prospect-database-us-it-provider": [
    GUIDE.mspLeadGen,
    GUIDE.completeB2B,
    GUIDE.coldEmail,
  ],
  "professional-services-contact-enrichment": [
    GUIDE.enrichment,
    GUIDE.dataEnrichment,
    GUIDE.emailVerify,
  ],
  "recruitment-decision-maker-list": [
    GUIDE.linkedin,
    GUIDE.prospecting,
    GUIDE.prospectLists,
  ],
  "saas-lead-generation-uk-analytics-platform": [
    GUIDE.completeB2B,
    GUIDE.prospectLists,
    GUIDE.leadScoring,
  ],
  "verified-contact-list-australian-saas": [
    GUIDE.prospectLists,
    GUIDE.emailVerify,
    GUIDE.maps,
  ],
};

export const DEFAULT_RELATED_GUIDES: RelatedGuide[] = [
  GUIDE.completeB2B,
  GUIDE.prospectLists,
  GUIDE.prospecting,
];

export function getPortfolioGuides(slug: string): RelatedGuide[] {
  return RELATED_GUIDES_BY_PORTFOLIO[slug] ?? DEFAULT_RELATED_GUIDES;
}
