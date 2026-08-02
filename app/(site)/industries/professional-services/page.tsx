"use client";

import Link from "next/link";
import {
  Briefcase,
  Globe2,
  Users,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfessionalServicesIndustryPage() {
  const challenges = [
    {
      title: "Referral pipelines run dry",
      description:
        "Consultancies and agencies grow on referrals until they plateau. Without a repeatable outbound engine, business development becomes feast or famine.",
    },
    {
      title: "Too-broad targeting",
      description:
        "Professional services win by specialization. Generic lists don't identify companies that need your specific consulting or agency offering.",
    },
    {
      title: "Decision-maker reach",
      description:
        "Selling into companies means reaching owners, partners, and department heads. Generic contact data misses the right person entirely.",
    },
  ];

  const howWeHelp = [
    {
      icon: Briefcase,
      title: "Specialist-fit targeting",
      description:
        "We build lists of companies that need your specific service line—by industry, size, and pain-point indicators.",
    },
    {
      icon: Users,
      title: "Partner & owner contacts",
      description:
        "We find owners, partners, and department heads so your proposals land with the person who buys.",
    },
    {
      icon: LineChart,
      title: "Growth-signal research",
      description:
        "We flag companies hiring, expanding, or changing—the moments when external expertise gets hired.",
    },
    {
      icon: ShieldCheck,
      title: "Verified, CRM-ready data",
      description:
        "Every record is enriched and email-validated, formatted for your CRM and follow-up workflows.",
    },
  ];

  const deliverables = [
    "Companies matching your service specialization",
    "Verified business emails and phone numbers",
    "Owner, partner, and decision-maker contacts",
    "Industry, size, and growth-signal data",
    "CRM-ready formatting for your outreach stack",
  ];

  return (
    <main className="flex flex-col">
      {/* Breadcrumbs structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.islahwebservice.com" },
              { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.islahwebservice.com/industries" },
              { "@type": "ListItem", position: 3, name: "Professional Services Lead Generation", item: "https://www.islahwebservice.com/industries/professional-services" },
            ],
          }),
        }}
      />

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What kinds of professional services firms benefit from this?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Consultancies, marketing and creative agencies, advisory firms, and specialized B2B service providers that need a steady pipeline of qualified business development opportunities.",
                },
              },
              {
                "@type": "Question",
                name: "How do you find companies that need our specific services?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We identify companies by industry, size, and growth signals—such as hiring, expansion, or new initiatives—that indicate demand for external expertise.",
                },
              },
              {
                "@type": "Question",
                name: "Who should our firm contact in a prospect company?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We deliver owners, partners, and department heads—the decision-makers who approve consulting and agency engagements—with verified contact details.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <Briefcase className="h-4 w-4" />
                For Professional Services
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Professional Services
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  Lead Generation
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We build targeted prospect databases for consultancies and agencies that need a steady flow of qualified business development opportunities.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/services">Explore Services</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Why BD stalls */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Business Development Stalls
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three reasons firm growth plateaus—and how verified data unblocks it.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">
                      <Briefcase className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-xl mb-3 text-white">{challenge.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-400">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How we help */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How We Build Your BD Pipeline
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A prospect database engineered for professional services growth.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeHelp.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-emerald-400" />
                      </div>
                      <CardTitle className="text-lg mb-3 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Every prospect list is targeted, verified, and ready for business development.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-base leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.2} className="mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get a Free Sample List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {[
              {
                q: "What kinds of professional services firms benefit from this?",
                a: "Consultancies, marketing and creative agencies, advisory firms, and specialized B2B service providers that need a steady pipeline of qualified business development opportunities.",
              },
              {
                q: "How do you find companies that need our specific services?",
                a: "We identify companies by industry, size, and growth signals—such as hiring, expansion, or new initiatives—that indicate demand for external expertise.",
              },
              {
                q: "Who should our firm contact in a prospect company?",
                a: "We deliver owners, partners, and department heads—the decision-makers who approve consulting and agency engagements—with verified contact details.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{item.a}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related industries */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Other Industries We Serve
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: "/industries/msp", title: "Managed Service Providers", icon: ShieldCheck },
              { href: "/industries/saas", title: "SaaS Companies", icon: TrendingUp },
              { href: "/industries/recruitment", title: "Recruitment Firms", icon: Users },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </CardTitle>
                      </div>
                    </Card>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
