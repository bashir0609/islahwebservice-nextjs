export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: Record<string, string>;
  headerLinks: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
}
