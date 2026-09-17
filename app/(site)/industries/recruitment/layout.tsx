import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Recruitment Prospect Research Services",
  description:
    "Research employers against your recruitment criteria, using hiring activity and company signals to identify relevant talent contacts for CRM-ready lists.",
  path: "/industries/recruitment",
});

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
