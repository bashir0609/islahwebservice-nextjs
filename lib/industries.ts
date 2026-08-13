/**
 * Single source of truth for Islah's priority industries.
 *
 * The site is built around ONE core service (B2B Prospect Research) applied
 * across industry pages. Keep the industry list here so adding a sixth
 * industry means editing one configuration file, not the footer, services
 * page, hub, and sitemap separately.
 *
 * Icon/tint choices are page-specific (lucide components can't live in a
 * shared server-safe config), so pages pair each entry with their own icon by
 * matching on `href`.
 */
export interface IndustryInfo {
  href: string;
  /** Short display name, e.g. "Managed Service Providers". */
  title: string;
  /** One-line positioning used in cards and metadata contexts. */
  tagline: string;
  /** Longer description used on the hub and services cards. */
  description: string;
}

export const INDUSTRIES: IndustryInfo[] = [
  {
    href: "/industries/saas",
    title: "SaaS",
    tagline: "Software companies targeting other businesses",
    description:
      "Criteria-matched company research for SaaS sales teams: technology stacks, funding stage, hiring activity, and the revenue roles your product supports.",
  },
  {
    href: "/industries/msp",
    title: "Managed Service Providers",
    tagline: "IT service companies that sell to other businesses",
    description:
      "Targeted company research for MSPs: businesses matching your geography, size, industry, and IT-related criteria — with the owners and IT leaders you want to reach.",
  },
  {
    href: "/industries/recruitment",
    title: "Recruitment",
    tagline: "Staffing and recruitment agencies",
    description:
      "Hiring-signal research for recruitment firms: companies with open roles, hiring growth, and expansion — matched to the talent leaders your agency serves.",
  },
  {
    href: "/industries/professional-services",
    title: "Professional Services",
    tagline: "Consultancies, agencies & advisory firms",
    description:
      "Criteria-matched account research for consultancies, agencies, and advisory firms — companies showing the growth events and business-model signals your firm specializes in.",
  },
  {
    href: "/industries/real-estate",
    title: "Real Estate",
    tagline: "Commercial property & real estate organizations",
    description:
      "Research property owners, investors, property-management companies, and other real estate organizations using location, ownership, portfolio, property-type, and client-defined criteria.",
  },
];

/** Lookup helper for pages that need a single industry by path. */
export function getIndustry(href: string): IndustryInfo | undefined {
  return INDUSTRIES.find((i) => i.href === href);
}

/**
 * Secondary markets researched across project history.
 *
 * Deliberately SEPARATE from INDUSTRIES: these are shown as experience on the
 * industries hub and About page only. They must NOT feed the footer, nav,
 * services page, sitemap, or any page-generation code — no dedicated landing
 * pages exist for them, and none should be auto-generated.
 */
export interface AdditionalIndustryExperience {
  /** Display label, e.g. "Healthcare & Medical". */
  label: string;
  /** One-line description of what can be researched in this market. */
  description: string;
}

export const ADDITIONAL_INDUSTRY_EXPERIENCE: AdditionalIndustryExperience[] = [
  {
    label: "Ecommerce & Retail",
    description:
      "Brand and company discovery, retailer research, and manufacturer or distributor research for partnership-focused outreach.",
  },
  {
    label: "Healthcare & Medical",
    description:
      "Organization research by client-defined criteria and geography, with relevant executive and operational roles.",
  },
  {
    label: "Marketing Agencies",
    description:
      "Agency-type, geography, employee-size, and founder or partner leadership research.",
  },
  {
    label: "Local Businesses & Home Services",
    description:
      "Business-directory and Google Maps research by geography and category, with owner and manager discovery.",
  },
  {
    label: "Manufacturers & Distributors",
    description:
      "Company and facility research with plant, operations, and engineering leadership roles.",
  },
  {
    label: "Other B2B Markets",
    description:
      "Client-defined targeting criteria applied to any researchable B2B market.",
  },
];
