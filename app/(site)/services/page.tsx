"use client";

import Link from "next/link";
import {
  Globe2,
  Brain,
  Mail,
  Settings,
  ArrowRight,
  CheckCircle2,
  PencilRuler,
  ClipboardCheck,
  Rocket
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/site/hero-visual";

export default function ServicesPage() {
  const services = [
    {
      slug: "verified-b2b-contact-lists",
      title: "Google Maps + Website Extraction",
      icon: Globe2,
      tint: "bg-blue-500/15 text-blue-400",
      description: "We scrape Google Maps and company websites to discover real businesses in your target market—not generic databases or recycled lists. This is the foundation of our AI lead generation system.",
      features: [
        "Google Maps lead extraction by location and category",
        "Website data extraction for accurate contact details",
        "ICP research and qualification against your ideal customer profile",
        "Fresh, non-recycled data built specifically for your campaign"
      ]
    },
    {
      slug: "lead-generation-analysis",
      title: "AI Analysis + ICP Filtering",
      icon: Brain,
      tint: "bg-purple-500/15 text-purple-400",
      description: "Our AI analyzes each prospect, filters by your ideal customer profile, and ranks leads by conversion potential—so you only reach out to the best fits. This transforms raw data into qualified opportunities.",
      features: [
        "AI-powered lead scoring & ranking",
        "Behavioral pattern recognition",
        "Real-time pipeline analytics",
        "CRM integration support"
      ]
    },
    {
      slug: "business-process-automation",
      title: "Automated Outreach + Follow-Up",
      icon: Mail,
      tint: "bg-orange-500/15 text-orange-400",
      description: "Personalized cold email sequences, automated follow-ups, and CRM-ready workflows that turn leads into booked meetings on autopilot. This completes the system from discovery to conversion.",
      features: [
        "Personalized cold email generation",
        "Automated follow-up sequences",
        "CRM-ready workflow automation",
        "Reduces manual effort by up to 80%"
      ]
    }
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section — two-column with product mockup */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <SectionReveal delay={0.2} className="mb-5 sm:mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-blue-400">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-500" />
                  </span>
                  Professional B2B Services
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                  One system.
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-teal-400">
                    Three services.
                  </span>
                  <span className="block text-white">Real results.</span>
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.6} className="mb-8 sm:mb-10 mx-auto lg:mx-0 max-w-xl">
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                  From verified contact lists to intelligent process automation, we deliver tailored solutions that transform your B2B operations.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.8} className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-5 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get a Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/portfolio">See Results</Link>
                </Button>
              </SectionReveal>

              <SectionReveal delay={1} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Verified data
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  USA · UK · AU
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Automation ready
                </span>
              </SectionReveal>
            </div>

            {/* Product mockup visual */}
            <SectionReveal delay={0.3}>
              <HeroVisual />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Specialized services designed to address the unique challenges of modern B2B enterprises.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <SectionReveal delay={index * 0.2} className="h-full" key={service.slug}>
                <Card className="group relative overflow-hidden h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="p-8 flex-grow">
                    <div className={`w-16 h-16 rounded-2xl ${service.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl mb-4 text-white">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group-hover:text-cyan-400 transition-colors hover:underline"
                      >
                        {service.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-base leading-relaxed mb-6 flex-grow text-slate-400">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-3 mt-auto">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-cyan-400 font-medium hover:gap-2 transition-all mt-6"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              How we implement your custom solutions
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: 1, title: "Discovery", description: "Understanding your unique business requirements and challenges.", icon: PencilRuler },
              { step: 2, title: "Evaluation", description: "Analyzing data sources and identifying optimization opportunities.", icon: ClipboardCheck },
              { step: 3, title: "Implementation", description: "Deploying tailored solutions with minimal disruption to workflow.", icon: Rocket },
              { step: 4, title: "Optimization", description: "Continuous monitoring and refinement for maximum results.", icon: Settings }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index} className="relative">
                  <Card className="h-full flex flex-col items-center text-center p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-cyan-400 shadow">
                        {item.step}
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl mb-3 text-white">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex-grow text-slate-400">
                      {item.description}
                    </CardDescription>
                  </Card>
                  {index < 3 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Recommendation CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Accelerate Your B2B Growth?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get started with our expert team today. We'll provide a free consultation to identify the perfect solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                <Link href="/portfolio">View Success Stories</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
