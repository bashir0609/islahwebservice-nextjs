"use client";

import Link from "next/link";
import {
  TrendingUp,
  Target,
  Brain,
  BarChart3,
  ArrowRight,
  Zap,
  Filter,
  Shield,
  Building2,
  Wrench,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LeadGenerationAnalysisPage() {
  const features = [
    { icon: Brain, title: "AI-Powered Lead Scoring", description: "Machine learning models analyze 200+ signals to rank leads by conversion probability." },
    { icon: Target, title: "Precision Targeting", description: "Identify high-intent prospects using behavioral patterns, technographics, and firmographics." },
    { icon: BarChart3, title: "Real-Time Pipeline Analytics", description: "Live dashboards track lead velocity, conversion rates, and revenue attribution." },
    { icon: Zap, title: "Intent Signal Detection", description: "Monitor buying signals across web, content consumption, and technology adoption." },
    { icon: Filter, title: "Dynamic Segmentation", description: "Auto-segment leads by industry, size, intent, engagement, and custom criteria." },
    { icon: Shield, title: "Revenue Attribution", description: "Connect marketing touchpoints to closed deals with multi-touch attribution models." },
  ];

  const processSteps = [
    { step: 1, title: "Data Collection", description: "Aggregate signals from 50+ sources including web, social, and third-party data." },
    { step: 2, title: "AI Enrichment", description: "Enhance leads with predictive scores, intent signals, and firmographic data." },
    { step: 3, title: "Smart Segmentation", description: "Auto-categorize leads by fit, intent, and engagement for targeted outreach." },
    { step: 4, title: "Activation", description: "Sync qualified leads to CRM and marketing automation for immediate action." },
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
            name: "Lead Generation Analysis",
            serviceType: "AI Lead Scoring & Qualification",
            description:
              "AI-driven lead generation analysis to identify high-value prospects, increase conversions, and shorten sales cycles with intent signals.",
            provider: {
              "@type": "Organization",
              name: "Islah Web Service",
              url: "https://www.islahwebservice.com",
            },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/services/lead-generation-analysis",
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
                name: "AI Analysis + ICP Filtering",
                item: "https://www.islahwebservice.com/services/lead-generation-analysis",
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-purple-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-purple-500" />
                </span>
                Step 2 of AI Lead Generation System
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                AI Analysis +
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ICP Filtering
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Our AI analyzes each prospect, filters by your ideal customer profile, and ranks leads by conversion potential—so you only reach out to the best fits. This transforms raw data into qualified opportunities.
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

        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Key Stats */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-500/15 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">3.5×</div>
              <div className="text-sm text-slate-400">Conversion Increase</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-500/15 rounded-2xl flex items-center justify-center">
                <Target className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">89%</div>
              <div className="text-sm text-slate-400">Lead Accuracy</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-500/15 rounded-2xl flex items-center justify-center">
                <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">60%</div>
              <div className="text-sm text-slate-400">Faster Qualification</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-purple-500/15 rounded-2xl flex items-center justify-center">
                <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">200+</div>
              <div className="text-sm text-slate-400">AI Signals Analyzed</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Driven Lead Intelligence
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Move beyond basic lead capture to predictive intelligence that identifies your best opportunities.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
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

      {/* Process */}
      <section id="how-it-works" className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              From raw data to revenue-ready leads in four automated steps.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <StaggerItem key={index} className="relative">
                <Card className="h-full flex flex-col items-center text-center p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                      <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-purple-400 shadow">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-3 text-white">{step.title}</CardTitle>
                  <CardDescription className="flex-grow text-slate-400">{step.description}</CardDescription>
                </Card>
                {index < 3 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
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
              <Link href="/services/verified-b2b-contact-lists" className="group block">
                <Card className="h-full p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        Verified B2B Contact Lists
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-400">
                        Custom-built contact lists from Google Maps and company websites with ICP research and enrichment.
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

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Lead Generation?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start with a free analysis of your current pipeline and see the AI difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Free Pipeline Analysis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
