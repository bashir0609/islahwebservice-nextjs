import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Recruitment Lead Generation Services",
  description:
    "Recruitment lead generation services built around hiring signals. Research companies matching agreed hiring and growth criteria, with verified talent-leader contacts for recruitment firms.",
  path: "/industries/recruitment",
});

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
