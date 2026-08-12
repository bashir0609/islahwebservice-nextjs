"use client";

import Link from "next/link";
import {
  Mail,
  Linkedin,
  Phone,
  Briefcase,
  Building2,
  Database,
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  UserCog,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const faqs = [
  {
    q: "What is existing database enrichment?",
    a: "You already have a prospect list or CRM export. We complete the missing or outdated fields — emails, phone numbers, LinkedIn URLs, job titles, company details — then verify, deduplicate, and standardize the records so the database is ready for your workflow.",
  },
  {
    q: "Which fields can you complete on my existing list?",
    a: "Missing business emails, missing phone numbers, LinkedIn URLs, job-title updates, contact replacement, company-field completion (size, industry, revenue, location), email verification, deduplication, record standardization, and general database cleanup.",
  },
  {
    q: "Can you enrich my existing CRM data?",
    a: "Yes. Upload your current records and we'll fill in missing fields, deduplicate, and standardize the data — delivered back in your CRM-ready format.",
  },
  {
    q: "How is enriched data verified?",
    a: "Enriched contacts pass format checks, domain validation, and role confirmation. We mark records by verification status so you know exactly what's usable. Email status can change after verification, and campaign results also depend on your sending infrastructure and practices.",
  },
  {
    q: "What is the difference between valid, risky, and invalid emails?",
    a: "Valid emails pass all checks available at the time of verification and are generally usable. Risky emails have formatting or domain signals that may reduce deliverability — review before sending. Invalid emails fail verification and are excluded from your list.",
  },
];

export default function ContactEnrichmentPage() {
  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Existing Database Enrichment & Contact Data Completion",
            serviceType: "B2B Contact Data Enrichment",
            description:
              "Complete and clean an existing prospect or CRM database: missing emails, phone numbers, LinkedIn URLs, job-title updates, contact replacement, company-field completion, email verification, deduplication, and record standardization.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/contact-enrichment",
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
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.islahwebservice.com/services" },
              { "@type": "ListItem", position: 3, name: "Existing Database Enrichment", item: "https://www.islahwebservice.com/contact-enrichment" },
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

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
                <Layers className="h-4 w-4" />
                For Clients Who Already Have a List
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Existing Database
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                  Enrichment &amp; Contact Data Completion
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                You already have the list. We complete it — missing emails, missing phone numbers, LinkedIn
                URLs, updated job titles, and verified, clean records delivered back CRM-ready.
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
                <Link href="/b2b-prospect-research">B2B Prospect Research</Link>
              </Button>
            </SectionReveal>

            <SectionReveal immediate delay={1} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                For lists you already own
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verification status on every record
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Deduplicated &amp; standardized
              </span>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* What we complete */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What We Complete on Your List
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tell us which fields are missing or outdated. We research, verify, and return the completed database.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mail, title: "Missing Emails", description: "Verified business emails added to records that lack a valid address." },
              { icon: Phone, title: "Missing Phone Numbers", description: "Direct dials and office lines where legitimately available and relevant." },
              { icon: Linkedin, title: "LinkedIn URLs", description: "Correct LinkedIn profiles found and confirmed for each contact." },
              { icon: Briefcase, title: "Job-Title Updates", description: "Outdated or missing titles corrected so you reach the right person." },
              { icon: UserCog, title: "Contact Replacement", description: "Replacing contacts who moved on with the current person in the role." },
              { icon: Building2, title: "Company-Field Completion", description: "Size, industry, revenue, location, and website details filled in." },
              { icon: ShieldCheck, title: "Email Verification", description: "Every address classified valid, risky, or invalid before delivery." },
              { icon: Database, title: "Deduplication & Cleanup", description: "Duplicate records merged, standardized, and cleaned for your CRM." },
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

      {/* How it works */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How Existing Database Enrichment Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From your records to a verified, standardized database in four steps.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Share Your Existing Records", description: "Send a CSV, Excel, or Google Sheets export from your CRM or list." },
              { step: 2, title: "Agree the Completion Fields", description: "We confirm which missing fields to research, replace, or verify." },
              { step: 3, title: "Research, Verify & Clean", description: "Enrichment, email verification, deduplication, and standardization." },
              { step: 4, title: "Deliver CRM-Ready Data", description: "Clean, labeled records returned in your required format." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-4">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <CardTitle className="text-lg mb-2 text-white">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-slate-400">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Verification levels */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Email Verification That Helps Protect Your Domain
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every email is classified by verification status so you know which records to prioritize.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { status: "Valid", color: "text-emerald-400", ring: "border-emerald-500/30 bg-emerald-500/10", description: "Passes all checks available at verification time — format, domain, and mailbox. Generally usable." },
              { status: "Risky", color: "text-amber-400", ring: "border-amber-500/30 bg-amber-500/10", description: "Shows signals that may reduce deliverability. Review before sending. Status can change." },
              { status: "Invalid", color: "text-red-400", ring: "border-red-500/30 bg-red-500/10", description: "Fails verification. Excluded from your list to protect your sender reputation." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className={`h-full border ${item.ring} backdrop-blur-sm hover:-translate-y-2 transition-all duration-300`}>
                  <CardHeader className="text-center">
                    <CardTitle className={`text-2xl mb-3 ${item.color}`}>{item.status}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-400">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What you receive */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Your completed database — clean, verified, and ready for your CRM.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: "Completed email fields" },
                    { icon: Linkedin, label: "LinkedIn profiles" },
                    { icon: Briefcase, label: "Updated job titles" },
                    { icon: Building2, label: "Completed company fields" },
                    { icon: ShieldCheck, label: "Validity classification" },
                    { icon: FileSpreadsheet, label: "Deduplicated, CRM-ready records" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Enrichment that protects your deliverability and targets the right people.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Verification Classification", description: "Valid, risky, and invalid classification so you know which records to prioritize." },
              { icon: Search, title: "Right-Person Focus", description: "We find and confirm the person by role — not a generic company inbox." },
              { icon: Database, title: "Clean Database Output", description: "Deduplicated, standardized records you can load straight into your CRM." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <CardTitle className="text-xl mb-3 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
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

      {/* Related guides */}
      <RelatedGuides
        tone="900"
        accent={{ chip: "bg-purple-500/15 text-purple-400", border: "hover:border-purple-500/40", text: "group-hover:text-purple-400" }}
        guides={[
          {
            href: "/blog/contact-enrichment-guide",
            title: "Contact Enrichment: Complete and Verify B2B Data",
            description: "Which data fields matter most, and how verification separates valid, risky, and invalid addresses.",
          },
          {
            href: "/blog/what-is-b2b-data-enrichment-complete-guide-for-sales-teams",
            title: "What Is B2B Data Enrichment? Complete Guide",
            description: "How enrichment turns incomplete prospect lists into accurate, verified, CRM-ready data for outreach.",
          },
          {
            href: "/blog/email-verification-guide",
            title: "Email Verification: Cut Bounce Rates Before You Send",
            description: "Why verification is non-negotiable for cold outreach and how clean lists protect your domain reputation.",
          },
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              See What We Can Complete on a Few of Your Records
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Send a small sample of your existing list and we&apos;ll enrich, verify, and clean it — free, so you
              can judge the result before committing to the full database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
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
