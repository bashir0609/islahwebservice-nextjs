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

const SERVICE = {
  b2b: {
    href: "/b2b-lead-generation",
    title: "B2B Lead Generation",
    description:
      "End-to-end lead generation: researched companies, verified contacts, and CRM-ready prospect databases.",
  },
  prospectList: {
    href: "/prospect-list-building",
    title: "Prospect List Building",
    description:
      "ICP-filtered prospect databases with verified decision-maker contacts for outbound campaigns.",
  },
  enrichment: {
    href: "/contact-enrichment",
    title: "Contact Enrichment",
    description:
      "Verified emails, direct dials, and technographic data appended to your existing lists.",
  },
  decisionMaker: {
    href: "/decision-maker-research",
    title: "Decision Maker Research & Contact Discovery",
    description:
      "Role-fit decision makers identified and verified so your outreach reaches the right person.",
  },
} as const;

const INDUSTRY = {
  msp: {
    href: "/industries/msp",
    title: "Managed Service Providers",
    description:
      "Prospect lists for MSPs targeting managed IT, cloud, and cybersecurity buyers.",
  },
  saas: {
    href: "/industries/saas",
    title: "SaaS Companies",
    description:
      "Data for SaaS sales teams targeting software buyers by stack, size, and budget.",
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
    services: [SERVICE.prospectList, SERVICE.decisionMaker],
    industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
  },
  "cold-email-for-b2b-lead-generation": {
    services: [SERVICE.b2b, SERVICE.enrichment],
    industries: [INDUSTRY.recruitment],
  },
  "complete-guide-to-b2b-lead-generation": {
    services: [SERVICE.b2b, SERVICE.prospectList, SERVICE.enrichment],
    industries: [INDUSTRY.msp, INDUSTRY.saas],
  },
  "contact-enrichment-guide": {
    services: [SERVICE.enrichment, SERVICE.prospectList],
    industries: [INDUSTRY.recruitment, INDUSTRY.professionalServices],
  },
  "email-verification-guide": {
    services: [SERVICE.enrichment, SERVICE.prospectList],
    industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
  },
  "how-to-build-a-clean-b2b-lead-list-for-cold-email": {
    services: [SERVICE.prospectList, SERVICE.decisionMaker],
    industries: [INDUSTRY.saas],
  },
  "how-to-build-b2b-prospect-lists": {
    services: [SERVICE.prospectList, SERVICE.enrichment],
    industries: [INDUSTRY.saas],
  },
  "how-to-extract-verified-leads-from-google-maps-ethically": {
    services: [SERVICE.enrichment, SERVICE.prospectList, SERVICE.decisionMaker],
    industries: [INDUSTRY.professionalServices],
  },
  "linkedin-outreach-for-b2b-sales": {
    services: [SERVICE.decisionMaker, SERVICE.enrichment],
    industries: [INDUSTRY.professionalServices],
  },
  "msp-lead-generation-guide": {
    services: [SERVICE.b2b, SERVICE.decisionMaker],
    industries: [INDUSTRY.msp],
  },
  "b2b-lead-scoring-guide": {
    services: [SERVICE.enrichment, SERVICE.prospectList],
    industries: [INDUSTRY.msp, INDUSTRY.saas],
  },
  "what-is-b2b-data-enrichment-complete-guide-for-sales-teams": {
    services: [SERVICE.enrichment, SERVICE.prospectList],
    industries: [INDUSTRY.saas],
  },
  "what-is-b2b-lead-generation-a-2026-guide-for-growth-teams": {
    services: [SERVICE.b2b, SERVICE.prospectList, SERVICE.enrichment],
    industries: [INDUSTRY.saas, INDUSTRY.msp],
  },
};

/** Fallback used for any post without a curated mapping (e.g. future posts). */
export const DEFAULT_RELATED_CONTENT: RelatedContent = {
  services: [SERVICE.b2b, SERVICE.prospectList],
  industries: [INDUSTRY.saas, INDUSTRY.professionalServices],
};

export function getRelatedContent(slug: string): RelatedContent {
  return RELATED_CONTENT_BY_POST[slug] ?? DEFAULT_RELATED_CONTENT;
}
