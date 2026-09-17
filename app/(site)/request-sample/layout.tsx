import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Free Prospect Research Sample",
  description:
    "Request a free research sample based on your targeting criteria to review the company fields, contact roles, and data format before scoping a project.",
  path: "/request-sample",
});

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
