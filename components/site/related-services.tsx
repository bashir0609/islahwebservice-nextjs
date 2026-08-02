"use client";

import Link from "next/link";
import { ArrowRight, Building2, Target } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelatedContent } from "@/lib/related-content";

interface RelatedServicesProps {
  slug: string;
  /** "900" (slate-900) or "950" (slate-950) section background — pick the tone that alternates with surrounding sections */
  tone?: "900" | "950";
}

export function RelatedServices({ slug, tone = "900" }: RelatedServicesProps) {
  const { services, industries } = getRelatedContent(slug);
  const bg = tone === "950" ? "bg-slate-950" : "bg-slate-900";

  const serviceLinks = services.map((s) => ({ ...s, kind: "service" as const }));
  const industryLinks = industries.map((i) => ({ ...i, kind: "industry" as const }));
  const links = [...serviceLinks, ...industryLinks];

  if (links.length === 0) return null;

  return (
    <section className={`relative overflow-hidden py-16 sm:py-24 ${bg}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Related Services
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Turn these insights into pipeline with our B2B lead generation services — built for the exact audience this guide covers.
          </p>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <StaggerItem key={link.href} className="h-full">
              <Link href={link.href} className="group block h-full">
                <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                        {link.kind === "service" ? (
                          <Target className="h-5 w-5 text-cyan-400" />
                        ) : (
                          <Building2 className="h-5 w-5 text-teal-400" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          link.kind === "service" ? "text-cyan-400" : "text-teal-400"
                        }`}
                      >
                        {link.kind === "service" ? "Service" : "Industry"}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {link.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-slate-400 mb-4">
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                  <span className="inline-flex items-center text-cyan-400 text-sm font-medium">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal delay={0.3} className="mt-12 text-center">
          <Link
            href="/free-consultation"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Get a free consultation to plan your pipeline
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
