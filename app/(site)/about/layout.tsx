import { pageMetadata, withSiteName } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet Islah Web Service, a research partner since 2016, and learn how our team turns client criteria into company research and CRM-ready contact records.",
  path: "/about",
  includeBrandSuffix: true,
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
