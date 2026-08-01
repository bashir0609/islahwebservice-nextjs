import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verified B2B Contact Lists",
  description:
    "Custom-built contact lists sourced from Google Maps and business websites, with ICP research and first-party enrichment for your exact target market.",
  path: "/services/verified-b2b-contact-lists",
});

export default function VerifiedContactListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
