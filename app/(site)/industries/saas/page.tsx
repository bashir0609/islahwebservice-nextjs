"use client";

import Link from "next/link";
import {
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Briefcase,
  Building2,
  Search,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const researchCriteria = [
  "Funding stage & last funding date",
  "Employee growth & headcount trends",
  "Hiring activity — including recent sales hiring",
  "Technologies used & existing CRM",
  "SaaS category & product fit",
  "Company size & geography",
  "ARR or revenue where researchable",
  "Expansion signals & new locations",
];

const decisionMakerRoles = [
  "VP Sales · Head of Sales · CRO",
  "VP Marketing · Head of Growth · RevOps",
  "IT leadership",
  "Finance leadership",
];

export default function SaasIndustryPage() {
  const faqs = [
    {
      q: "How do you find companies that match my SaaS ICP?",
      a: "We build prospect research around your exact ideal customer profile — industry, company size, tech stack, funding stage, and growth signals — so every company is a criteria-matched account for your platform.",
    },
    {
      q: "Which decision-makers should a SaaS team research?",
      a: "You specify the roles that matter. Common requests include VP Sales, Head of Sales, CRO, VP Marketing, Head of Growth, RevOps, and IT or finance leadership. We find current people matching those requirements and verify names, roles, and seniority.",
    },
    {
      q: "Can you support ABM campaigns?",
      a: "Yes. We can research an account-focused prospect list for your target account list, complete with decision-makers and verified contacts for account-based outreach.",
    },
    {
      q: "Does your research prove purchase intent?",
      a: "No. We deliver criteria-matched companies and relevant research signals — such as requested funding, hiring, or technology indicators. We do not claim companies are ready to buy or that leads are guaranteed to convert.",
    },
  ];

  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "SaaS Lead Generation Services",
            serviceType: "B2B Prospect Research",
            description:
              "SaaS lead generation services built on accurate prospect data: companies researched against your target market criteria, relevant decision-makers identified, and contact data enriched, verified, and delivered CRM-ready.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/industries/saas",
          }),
        }}
      />

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
              { "@type": "ListItem", position: 3, name: "SaaS Lead Generation Services", item: "https://www.islahwebservice.com/industries/saas" },
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
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
                <TrendingUp className="h-4 w-4" />
                For SaaS Sales Teams
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                SaaS Lead Generation Services
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                  Built on Accurate Prospect Data
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We research companies that match your target market, identify relevant decision-makers, enrich and
                verify contact data, and deliver CRM-ready prospect lists for your outbound team.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/b2b-prospect-research">See B2B Prospect Research</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* How we research SaaS accounts */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              SaaS-Specific Research Criteria
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We research companies against the criteria that matter for software sales — requested growth and
              technology indicators, never unproven purchase intent.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Technology & stack signals", description: "Technologies used, existing CRM, and the tools your product complements or replaces." },
              { icon: TrendingUp, title: "Funding & growth indicators", description: "Funding stage, last funding date, employee growth, and expansion signals — where requested." },
              { icon: Users, title: "Hiring activity", description: "Recent sales hiring and team-building signals that indicate an active go-to-market motion." },
              { icon: Building2, title: "Company & category fit", description: "SaaS category, company size, geography, and ARR or revenue where researchable." },
              { icon: Target, title: "Criteria-matched accounts", description: "Every company is matched against the ICP and targeting criteria you provide." },
              { icon: ShieldCheck, title: "Verified contact data", description: "Requested decision-makers identified, enriched, and verified before delivery." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <CardTitle className="text-lg mb-3 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-slate-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Research criteria + roles */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionReveal>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Search className="h-6 w-6 text-purple-400" />
                    Company Research Criteria
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Typical criteria SaaS teams request for company research:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
                    {researchCriteria.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-400" />
                    Decision-Maker Research
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Example roles SaaS teams request — you specify the titles that matter:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {decisionMakerRoles.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    We identify current people matching the requested roles. We do not claim companies are ready to
                    buy, that they need your software, or that purchase intent is proven.
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              A CRM-ready prospect database of criteria-matched SaaS accounts.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {[
                    "Companies matching your ICP and requested research signals",
                    "Verified business emails and phone numbers where available",
                    "Decision-maker names, titles, and LinkedIn profiles",
                    "Firmographic and technographic data",
                    "CRM-ready formatting for your outreach stack",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
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
                <Link href="/request-sample">
                  Get a Free Sample List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/portfolio/saas-lead-generation-uk-analytics-platform">See the SaaS Case Study</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Other Industries We Research
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: "/industries/msp", title: "Managed Service Providers", icon: ShieldCheck },
              { href: "/industries/recruitment", title: "Recruitment Firms", icon: Users },
              { href: "/industries/professional-services", title: "Professional Services", icon: Briefcase },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </CardTitle>
                      </div>
                    </Card>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal delay={0.3} className="mt-10 text-center">
            <Link href="/b2b-prospect-research" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              See how our B2B prospect research applies to your SaaS sales team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Related guides */}
      <RelatedGuides
        tone="950"
        accent={{ chip: "bg-purple-500/15 text-purple-400", border: "hover:border-purple-500/40", text: "group-hover:text-purple-400" }}
        guides={[
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build Targeted B2B Prospect Lists",
            description: "Research, filtering, qualification, and verification — the four steps that turn a spreadsheet into a sales asset.",
          },
          {
            href: "/blog/complete-guide-to-b2b-lead-generation",
            title: "The Complete Guide to B2B Lead Generation",
            description: "The full workflow — from defining target criteria to delivering CRM-ready prospect lists with verified decision makers.",
          },
          {
            href: "/blog/sales-prospecting-playbook",
            title: "The B2B Sales Prospecting Playbook",
            description: "Find accounts that match your target criteria and identify the right contacts for outreach.",
          },
        ]}
      />
    </main>
  );
}
