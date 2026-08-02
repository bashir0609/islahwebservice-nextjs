"use client";

import Link from "next/link";
import {
  Users,
  MapPin,
  Globe2,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifiedB2BContactListsPage() {
  const features = [
    { icon: MapPin, title: "Google Maps Extraction", description: "Business discovery and lead extraction from Google Maps for the exact locations and categories you need." },
    { icon: Users, title: "ICP Research & Qualification", description: "We research each business against your ideal customer profile to ensure fit before enrichment." },
    { icon: Globe2, title: "Website Enrichment", description: "Contact details are enriched from each business's own website for more accurate, first-party data." },
    { icon: Shield, title: "Fresh, Non-Recycled Data", description: "Every list is freshly researched and built for your campaign, not reused from old databases." },
    { icon: Zap, title: "Ready for Outreach", description: "Delivered in a usable format with relevant contacts so your team can start outreach quickly." },
  ];

  const useCases = [
    { title: "Client Prospecting", description: "Build lists for your own outbound based on your exact target market, location, and company profile." },
    { title: "Market Mapping", description: "Map competitors, partners, or prospects in a specific geography or industry segment." },
    { title: "Lead Preparation", description: "Get structured contact sets ahead of campaigns so sales or outreach teams can focus on converting." },
    { title: "Business Research", description: "Research companies by website, category, or territory with enriched contact details." },
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
            name: "Verified B2B Contact Lists",
            serviceType: "B2B Lead Generation",
            description:
              "Custom-built contact lists sourced from Google Maps and business websites, with ICP research and first-party enrichment for your exact target market.",
            provider: {
              "@type": "Organization",
              name: "Islah Web Service",
              url: "https://www.islahwebservice.com",
            },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/services/verified-b2b-contact-lists",
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.islahwebservice.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.islahwebservice.com/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Google Maps + Website Extraction",
                item: "https://www.islahwebservice.com/services/verified-b2b-contact-lists",
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-blue-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-500" />
                </span>
                Step 1 of AI Lead Generation System
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Google Maps +
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Website Extraction
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We scrape Google Maps and company websites to discover real businesses in your target market—not generic databases or recycled lists. This is the foundation of our AI lead generation system.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Claim Your Free AI Audit</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                <Link href="#how-it-works">See The Full System</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>

        {/* Floating Elements - hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Key Stats */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-500/15 rounded-2xl flex items-center justify-center">
                <Target className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Target-Based</div>
              <div className="text-sm text-slate-400">Lists Built From Your Criteria</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-500/15 rounded-2xl flex items-center justify-center">
                <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Google Maps</div>
              <div className="text-sm text-slate-400">Lead Extraction Source</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-500/15 rounded-2xl flex items-center justify-center">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">ICP Research</div>
              <div className="text-sm text-slate-400">Qualified Against Your Profile</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-500/15 rounded-2xl flex items-center justify-center">
                <Globe2 className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Website</div>
              <div className="text-sm text-slate-400">Enriched From Business Sites</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Our Contact Lists
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Every contact is verified, enriched, and organized for immediate outreach.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl mb-3 text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 pt-0 flex-grow">
                    <CardDescription className="text-base leading-relaxed text-slate-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Perfect For
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Our contact lists power growth across multiple business functions.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => (
              <StaggerItem key={index}>
                <Card className="h-full p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardTitle className="text-lg sm:text-xl mb-3 text-white">{useCase.title}</CardTitle>
                  <CardDescription className="flex-grow text-slate-400">{useCase.description}</CardDescription>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Related Services
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Combine our services for a complete B2B growth stack.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <SectionReveal delay={0}>
              <Link href="/services/lead-generation-analysis" className="group block">
                <Card className="h-full p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        Lead Generation Analysis
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-400">
                        AI-driven insights, predictive scoring, and real-time pipeline analytics to convert data into qualified opportunities.
                      </CardDescription>
                    </div>
                  </div>
                </Card>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Link href="/services/business-process-automation" className="group block">
                <Card className="h-full p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                      <Wrench className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        Business Process Automation
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-400">
                        End-to-end automation of recurring processes, reducing manual effort by up to 80% and improving accuracy.
                      </CardDescription>
                    </div>
                  </div>
                </Card>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Data Quality Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Data You Can Trust
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Multi-source verification, continuous enrichment, and compliance-first approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Request Sample Data</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                <Link href="/portfolio">See Results</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
