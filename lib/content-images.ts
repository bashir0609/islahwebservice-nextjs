export interface ContentImage {
  src: string;
  alt: string;
}

const pair = (slug: string, firstAlt: string, secondAlt: string): ContentImage[] => [
  { src: `/images/research/${slug}-workflow.svg`, alt: firstAlt },
  { src: `/images/research/${slug}-data-fields.svg`, alt: secondAlt },
];

export const CONTENT_IMAGES: Record<string, ContentImage[]> = {
  "/": pair("home-prospect-research", "B2B prospect research workflow from target criteria to CRM-ready delivery", "Example company and decision-maker fields in a custom B2B prospect database"),
  "/b2b-prospect-research": pair("b2b-prospect-research", "Custom B2B prospect research process for matching companies to an ICP", "CRM-ready prospect list fields for companies, decision-makers, and verified contacts"),
  "/contact-enrichment": pair("contact-enrichment", "Existing database enrichment workflow for auditing, completing, and verifying CRM records", "Contact enrichment fields for current roles, business emails, LinkedIn profiles, and company data"),
  "/industries/saas": pair("saas-prospect-research", "SaaS prospect research criteria covering firmographics, technology, funding, and growth signals", "SaaS prospect database fields for target accounts and product, data, and technology leaders"),
  "/industries/msp": pair("msp-prospect-research", "MSP prospect research criteria for company size, locations, IT environment, and service fit", "MSP prospect list fields for IT leadership, operations contacts, and company technology data"),
  "/industries/recruitment": pair("recruitment-prospect-research", "Recruitment prospect research workflow using hiring activity and client-defined company criteria", "Recruitment prospect database fields for talent, hiring, procurement, and department leaders"),
  "/industries/professional-services": pair("professional-services-research", "Professional services prospect research criteria for sector, scale, location, and decision roles", "Professional services prospect list fields for partners, practice leaders, and operations contacts"),
  "/industries/real-estate": pair("real-estate-prospect-research", "Real estate prospect research workflow for owners, operators, portfolios, and target markets", "Real estate prospect database fields for property, portfolio, facilities, and operations contacts"),
  "/blog/how-to-research-companies-by-technology-stack": pair("technology-stack-research-guide", "Technology-stack company research workflow from signal discovery to source verification", "Technographic prospect research fields for platforms, evidence sources, and verification dates"),
  "/blog/recruitment-lead-generation-guide": pair("recruitment-research-guide", "Recruitment lead research workflow using hiring signals and criteria-matched companies", "Recruitment research fields for open roles, hiring activity, company context, and decision-makers"),
  "/blog/how-to-find-decision-makers-in-b2b-companies": pair("decision-maker-research-guide", "B2B decision-maker research workflow from role map to multi-source verification", "Decision-maker research fields for responsibilities, seniority, current role, and contact evidence"),
  "/blog/how-to-research-recently-funded-companies": pair("funding-research-guide", "Recently funded company research workflow for verifying rounds, dates, and target criteria", "Funding research fields for round stage, announcement date, investors, source, and company contacts"),
  "/blog/contact-enrichment-guide": pair("contact-enrichment-guide", "B2B contact enrichment workflow for auditing missing fields and verifying completed records", "Contact enrichment output fields for titles, emails, phones, profiles, and verification status"),
};

export function contentImagesFor(pathname: string): ContentImage[] {
  return CONTENT_IMAGES[pathname] || [];
}
