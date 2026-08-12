import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Terms of Use",
  description:
    "The website terms of use for islahwebservice.com — covering the service boundary, no-guarantees disclaimer, acceptable use, and intellectual property.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
