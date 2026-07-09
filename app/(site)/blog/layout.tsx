import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Islah Web Service",
  description:
    "Read expert insights on B2B contact strategy, lead generation, and business process automation from the Islah Web Service team.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
