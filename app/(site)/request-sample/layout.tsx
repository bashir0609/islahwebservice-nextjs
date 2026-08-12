import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Free Prospect Research Sample",
  description:
    "Request a free B2B prospect research sample. Share your targeting criteria and receive a sample of criteria-matched companies, decision-makers, and verified contact data — no obligation.",
  path: "/request-sample",
});

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
