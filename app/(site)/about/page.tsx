"use client";

import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Users,
  MapPin,
  Target,
  Shield,
  Search,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <Building2 className="h-4 w-4" />
                Since 2016 · B2B Prospect Research
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                A Research Partner for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400">
                  Precise B2B Prospect Data
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-10 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We research companies, identify the requested decision-makers, enrich and verify contact details, and deliver clean, CRM-ready data. Everything we produce is built around your targeting criteria.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                <Award className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">190+</span>
                <span className="text-xs text-slate-400">Projects delivered</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">US · UK · AU</span>
                <span className="text-xs text-slate-400">Markets researched</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">100%</span>
                <span className="text-xs text-slate-400">Job Success Score</span>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <SectionReveal delay={0.2} className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Approach
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Founded in 2016, Islah Web Service started with a simple observation: businesses were struggling to find reliable, verified contacts in an increasingly digital world. We built a process around custom research—not generic databases—to solve that problem.
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Today, we focus on one thing: translating your targeting criteria into a verified, CRM-ready prospect database. We handle custom requirements ranging from company characteristics and geography to tech stacks, funding signals, and decision-maker titles. The data we deliver is researched, enriched, verified, and formatted for your workflow.
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Our responsibility is the research and data stage of outbound sales. We do not run campaigns, book meetings, or manage outreach. Your team controls the messaging, execution, and sales conversations that follow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/contact">Discuss Your Research Needs</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                  <Link href="/portfolio">View Our Projects</Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-8 backdrop-blur-sm border border-white/10">
                  <div className="aspect-square rounded-xl bg-slate-900/80 border border-white/10 shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="h-20 w-20 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        2016-2026
                      </h3>
                      <p className="text-slate-400">
                        B2B Prospect Research
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl opacity-40 blur-xl" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Guides Our Work
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The principles that shape every research project.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                title: "Research Accuracy",
                description: "We check sources, verify details, and deliver records you can rely on.",
                tint: "bg-blue-500/15 text-blue-400",
              },
              {
                icon: Target,
                title: "Precision",
                description: "Every database is built around the specific criteria you provide, not a generic template.",
                tint: "bg-purple-500/15 text-purple-400",
              },
              {
                icon: Users,
                title: "Partnership",
                description: "We work directly with you to understand your requirements and deliver what you need.",
                tint: "bg-orange-500/15 text-orange-400",
              },
              {
                icon: Shield,
                title: "Transparency",
                description: "Clear scope, open communication, and honest assessment of what can be researched.",
                tint: "bg-emerald-500/15 text-emerald-400",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="p-8 text-center border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${value.tint} flex items-center justify-center`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl mb-4 text-white">{value.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-400">{value.description}</CardDescription>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Proven Experience */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Proven Experience
            </h2>
            <p className="text-xl text-slate-400">
              Experience you can verify, not claims we manufacture.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "190+", label: "Completed Projects", icon: Award, detail: "B2B prospect research and data delivery projects" },
              { value: "100%", label: "Job Success Score", icon: Star, detail: "Current Upwork Job Success Score" },
              { value: "US · UK · AU", label: "Markets Researched", icon: MapPin, detail: "Business data research across three major markets" },
              { value: "Long-Term", label: "Client Relationships", icon: Users, detail: "Returning clients across multiple project types" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon className="h-10 w-10 text-cyan-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-400 font-medium mb-1">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.detail}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <SectionReveal delay={0.3} className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Long-Term Client, USA",
                  quote: "Bashir has been an instrumental part in our lead-generation efforts. He brings a wealth of knowledge around SEO and Email Marketing infrastructure and strategies. His team is professional and gets tasks done in a timely manner.",
                  meta: "3+ years of ongoing collaboration",
                },
                {
                  title: "Returning Client, USA",
                  quote: "Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads.",
                  meta: "Long-term repeat engagement",
                },
                {
                  title: "5-Star Client, USA",
                  quote: "Bashir is an excellent worker and I will hire him again.",
                  meta: "5.0 rating on Upwork",
                },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 mb-3" />
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
                  <div className="text-xs font-semibold text-cyan-400">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.meta}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://www.upwork.com/freelancers/bashirahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
              >
                <Star className="h-4 w-4 text-amber-400" />
                View verified Upwork profile
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Have a Specific Research Requirement?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Tell us who you want to target and we will help refine the research criteria before building a customized, verified prospect database.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/b2b-prospect-research">Explore B2B Prospect Research</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}