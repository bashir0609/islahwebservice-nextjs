"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface BlogGuide {
  href: string;
  title: string;
  description: string;
}

interface RelatedGuidesProps {
  guides: BlogGuide[];
  heading?: string;
  subtitle?: string;
  /** "900" (slate-900) or "950" (slate-950) section background — pick the tone that alternates with surrounding sections */
  tone?: "900" | "950";
  accent?: {
    chip?: string;
    border?: string;
    text?: string;
  };
}

export function RelatedGuides({
  guides,
  heading = "Related Guides",
  subtitle = "Go deeper with practical B2B lead generation guides from the Islah Journal.",
  tone = "900",
  accent = {},
}: RelatedGuidesProps) {
  const { chip = "bg-cyan-500/15 text-cyan-400", border = "hover:border-cyan-500/40", text = "group-hover:text-cyan-400" } = accent;
  const bg = tone === "950" ? "bg-slate-950" : "bg-slate-900";

  return (
    <section className={`relative overflow-hidden py-16 sm:py-24 ${bg}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{heading}</h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <StaggerItem key={guide.href} className="h-full">
              <Link href={guide.href} className="group block h-full">
                <Card className={`h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm ${border} hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300`}>
                  <CardHeader className="p-0">
                    <div className={`w-10 h-10 rounded-xl ${chip} flex items-center justify-center mb-4`}>
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <CardTitle className={`text-lg text-white mb-2 ${text} transition-colors`}>{guide.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-slate-400 mb-4">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <span className="inline-flex items-center text-cyan-400 text-sm font-medium">
                    Read the guide
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.3} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/free-consultation">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
