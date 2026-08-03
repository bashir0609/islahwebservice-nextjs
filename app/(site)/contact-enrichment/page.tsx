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
  Zap,
  Search,
  Layers,
  Globe2,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const faqs = [
  {
    q: "What fields can you enrich?",
    a: "We can add verified email addresses, LinkedIn URLs, phone numbers (where appropriate), job titles, company size, industry, and technology stack information to your existing records.",
  },
  {
    q: "Can you enrich my existing CRM data?",
    a: "Yes. Upload your current records and we'll fill in missing fields, deduplicate, and standardize the data—delivered back in your CRM-ready format.",
  },
  {
    q: "How is enriched data verified?",
    a: "Enriched contacts pass format checks, domain validation, and role confirmation. We mark records by verification status so you know exactly what's usable. Email status can change after verification, and campaign results also depend on your sending infrastructure and practices.",
  },
  {
    q: "What is the difference between valid, risky, and invalid emails?",
    a: "Valid emails pass all checks available at the time of verification and are generally usable. Risky emails have formatting or domain signals that may reduce deliverability—review before sending. Invalid emails fail verification and are excluded from your list.",
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
            name: "Contact Enrichment Service",
            serviceType: "Contact Enrichment",
            description:
              "Complete your prospect records with verified emails, LinkedIn profiles, job titles, company data, and technologies—so your outreach reaches the right people.",
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
              { "@type": "ListItem", position: 3, name: "Contact Enrichment", item: "https://www.islahwebservice.com/contact-enrichment" },
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
                Contact Enrichment Service
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Contact
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
                  Enrichment Service
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We complete your prospect records with verified emails, LinkedIn profiles, job titles, and company data—so every contact is ready for outreach.
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
                <Link href="/decision-maker-research">Decision-Maker Research</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* What we enrich */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What We Enrich
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Missing data costs you replies. We fill every field your outreach needs.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mail, title: "Email Addresses", description: "Verified business emails that pass format, domain, and deliverability checks." },
              { icon: Linkedin, title: "LinkedIn Profiles", description: "Find and confirm the right person's LinkedIn URL for research and outreach." },
              { icon: Phone, title: "Phone Numbers", description: "Direct dials and office lines where appropriate and relevant to your campaign." },
              { icon: Briefcase, title: "Job Titles", description: "Accurate roles so your message reaches the decision-maker, not a gatekeeper." },
              { icon: Building2, title: "Company Size", description: "Employee counts to segment by the company scale that fits your ICP." },
              { icon: Database, title: "Industry", description: "Correct industry classification for precise targeting and segmentation." },
              { icon: Zap, title: "Technologies", description: "Tech stack signals that identify companies ready for your solution." },
              { icon: Globe2, title: "Company Details", description: "Website, location, and firmographic data to complete each record." },
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

      {/* Verification levels */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
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
              { status: "Valid", color: "text-emerald-400", ring: "border-emerald-500/30 bg-emerald-500/10", description: "Passes all checks available at verification time—format, domain, and mailbox. Generally usable." },
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

      {/* How we work */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How We Work
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From raw records to complete, verified contacts in four steps.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Upload Your Records", description: "Send your existing contacts or let us build the list from scratch." },
              { step: 2, title: "Discovery & Matching", description: "We match companies and find missing people and contact fields." },
              { step: 3, title: "Enrichment", description: "We add emails, LinkedIn, titles, and firmographic data to each record." },
              { step: 4, title: "Verification & Delivery", description: "Every record is verified, deduplicated, and returned CRM-ready." },
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

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Complete, verified contact records ready for your CRM.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: "Verified emails" },
                    { icon: Linkedin, label: "LinkedIn profiles" },
                    { icon: Briefcase, label: "Job titles" },
                    { icon: Building2, label: "Company size & industry" },
                    { icon: Zap, label: "Technology signals" },
                    { icon: ShieldCheck, label: "Validity classification" },
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
              { icon: Search, title: "Right-Person Focus", description: "We find the decision-maker by role—not a generic company inbox." },
              { icon: Database, title: "Accurate Firmographics", description: "Company size, industry, and tech data you can filter and segment by." },
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
              Complete Your Contact Data Today
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Send us a sample of your records and see how much we can enrich—free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/prospect-list-building">Build a Prospect List</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
