import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — B2B Prospect Research Partner",
  description:
    "Meet Islah Web Service, a research partner since 2016, and learn how our team turns client criteria into company research and CRM-ready contact records.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
