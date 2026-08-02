"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Server,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Mail,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MspIndustryPage() {
  const challenges = [
    {
      title: "Generic lists don't work",
      description:
        "Most IT budgets are won locally. A national database of 'IT decision-makers' misses the businesses in your service area that actually need you.",
    },
    {
      title: "Wrong contact roles",
      description:
        "Sending to the wrong title wastes outreach. MSP buying decisions involve owners, IT managers, and operations leads—we find the right person.",
    },
    {
      title: "Stale data kills deliverability",
      description:
        "Outdated emails bounce, hurt your domain reputation, and sink cold outreach before it starts. Verified data protects your sending infrastructure.",
    },
  ];

  const howWeHelp = [
    {
      icon: Globe2,
      title: "Local market prospecting",
      description:
        "We extract businesses by location, size, and category so you target companies in your actual service area.",
    },
    {
      icon: Users,
      title: "Decision-maker research",
      description:
        "We identify owners, IT managers, and ops leads at each company so your outreach reaches the person who buys.",
    },
    {
      icon: ShieldCheck,
      title: "IT-fit qualification",
      description:
        "We flag companies likely to need managed services—older industries, no in-house IT, and growing teams.",
    },
    {
      icon: Mail,
      title: "Verified contact data",
      description:
        "Every email is validated and every record enriched before delivery, keeping bounce rates under 2%.",
    },
  ];

  const deliverables = [
    "Companies matching your ICP and service area",
    "Verified business emails and phone numbers",
    "Decision-maker names and job titles",
    "Website, industry, and company-size data",
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
              { "@type": "ListItem", position: 3, name: "MSP Lead Generation", item: "https://www.islahwebservice.com/industries/msp" },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <ShieldCheck className="h-4 w-4" />
                For Managed Service Providers
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                MSP Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                  That Finds Local Clients
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We build verified prospect lists of businesses in your service area that need managed IT, security, and support—so your team closes more recurring contracts.
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
                <Link href="/prospect-list-building">See How Lists Are Built</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Why MSPs struggle */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Most MSP Outreach Fails
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three mistakes we see in MSP prospecting—and how verified data fixes them.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">
                      <Server className="h-6 w-6 text-red-400" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How We Build Your MSP Pipeline
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A prospect database engineered for local managed services growth.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeHelp.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Every MSP prospect list is complete, verified, and ready to use.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
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

      {/* Related industries */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Other Industries We Serve
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: "/industries/saas", title: "SaaS Companies", icon: TrendingUp },
              { href: "/industries/recruitment", title: "Recruitment Firms", icon: Users },
              { href: "/industries/professional-services", title: "Professional Services", icon: Globe2 },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-cyan-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
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
