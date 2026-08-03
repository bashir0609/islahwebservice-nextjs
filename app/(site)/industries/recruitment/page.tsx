"use client";

import Link from "next/link";
import {
  Users,
  Building2,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

export default function RecruitmentIndustryPage() {
  const challenges = [
    {
      title: "Research eats billable time",
      description:
        "Every hour a recruiter spends hunting for companies and hiring managers is an hour not spent placing candidates. Manual prospecting is expensive.",
    },
    {
      title: "Wrong company targets",
      description:
        "Recruiters need companies that are actively hiring—growing teams with open roles. Generic business lists miss the demand signal.",
    },
    {
      title: "Outdated hiring contacts",
      description:
        "Sending pitches to stale or wrong contacts wastes outreach and damages relationships with HR and talent leads.",
    },
  ];

  const howWeHelp = [
    {
      icon: Building2,
      title: "Hiring-signal prospecting",
      description:
        "We target companies with growth signals—open roles, expansions, and hiring patterns—so you pitch where demand exists.",
    },
    {
      icon: Users,
      title: "Talent decision-makers",
      description:
        "We find HR leads, hiring managers, and founders at each company so your outreach reaches the person who approves staffing.",
    },
    {
      icon: Globe2,
      title: "Verified company data",
      description:
        "Company size, industry, and location details verified across sources for accurate territory planning.",
    },
    {
      icon: ShieldCheck,
      title: "CRM-ready delivery",
      description:
        "Clean, deduplicated records formatted for your CRM and outreach sequences.",
    },
  ];

  const deliverables = [
    "Companies with hiring and growth signals",
    "Verified business emails and phone numbers",
    "HR and hiring decision-maker contacts",
    "Company size, industry, and location data",
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
              { "@type": "ListItem", position: 3, name: "Recruitment Lead Generation", item: "https://www.islahwebservice.com/industries/recruitment" },
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
                name: "How do you identify companies that are hiring?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We target companies with growth signals—open roles, headcount expansion, and hiring patterns—so you pitch businesses where staffing demand already exists.",
                },
              },
              {
                "@type": "Question",
                name: "Which contacts do you deliver for recruitment outreach?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide HR leads, hiring managers, and founders at each company, with verified business emails and phone numbers so your pitch reaches the person who approves staffing.",
                },
              },
              {
                "@type": "Question",
                name: "Can you build lists for specific territories or industries?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We build lists by city, region, or industry vertical—healthcare, tech, finance, and more—tailored to the roles your agency specializes in.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,146,60,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
                <Users className="h-4 w-4" />
                For Recruitment Firms
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Recruitment Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-cyan-400">
                  That Finds Hiring Companies
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We deliver verified company and hiring-decision-maker data so recruiters spend more time placing talent and less time researching targets.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/prospect-list-building">See How Lists Are Built</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Why recruitment prospecting fails */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,146,60,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Recruiter Prospecting Is Slow
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three bottlenecks that keep recruiters from filling roles faster.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-red-400" />
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
              How We Build Your Client Pipeline
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A prospect database engineered for recruitment business development.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeHelp.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-orange-400" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Every recruitment prospect list is targeted, verified, and ready to use.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
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
                <Link href="/free-consultation">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {[
              {
                q: "How do you identify companies that are hiring?",
                a: "We target companies with growth signals—open roles, headcount expansion, and hiring patterns—so you pitch businesses where staffing demand already exists.",
              },
              {
                q: "Which contacts do you deliver for recruitment outreach?",
                a: "We provide HR leads, hiring managers, and founders at each company, with verified business emails and phone numbers so your pitch reaches the person who approves staffing.",
              },
              {
                q: "Can you build lists for specific territories or industries?",
                a: "Yes. We build lists by city, region, or industry vertical—healthcare, tech, finance, and more—tailored to the roles your agency specializes in.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/40 transition-all duration-300">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.06),transparent_55%)]" />
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
              { href: "/industries/professional-services", title: "Professional Services", icon: Briefcase },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-orange-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-orange-400 transition-colors">
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

      {/* Related guides */}
      <RelatedGuides
        tone="950"
        accent={{ chip: "bg-orange-500/15 text-orange-400", border: "hover:border-orange-500/40", text: "group-hover:text-orange-400" }}
        guides={[
          {
            href: "/blog/cold-email-for-b2b-lead-generation",
            title: "Cold Email for B2B Lead Generation",
            description: "Subject lines, sequences, and follow-ups that earn responses — built on verified prospect data.",
          },
          {
            href: "/blog/contact-enrichment-guide",
            title: "Contact Enrichment: Complete and Verify B2B Data",
            description: "Which data fields matter most, and how verification separates valid, risky, and invalid addresses.",
          },
          {
            href: "/blog/how-to-build-a-clean-b2b-lead-list-for-cold-email",
            title: "How to Build a Clean B2B Lead List for Cold Email",
            description: "Verified emails, deduplicated records, and the right decision makers — built for deliverability and replies.",
          },
        ]}
      />
    </main>
  );
}
