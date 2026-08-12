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
