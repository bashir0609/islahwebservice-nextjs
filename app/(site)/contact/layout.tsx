import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Islah Web Service to scope a B2B prospect research project—company research, decision-maker discovery, contact enrichment, and verified CRM-ready data delivery.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
