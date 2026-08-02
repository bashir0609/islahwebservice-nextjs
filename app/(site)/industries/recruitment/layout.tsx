import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for Recruitment Firms",
  description:
    "Verified prospect lists for recruitment and staffing agencies. We deliver company data and hiring decision-maker contacts so recruiters place talent faster.",
  path: "/industries/recruitment",
});

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
