"use client";

import Link from "next/link";
import {
  RotateCcw,
  Rocket,
  Zap,
  CheckCircle2,
  Clock,
  Shield,
  BarChart3,
  Cpu,
  Building2,
  TrendingUp,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BusinessProcessAutomationPage() {
  const features = [
    { icon: Cpu, title: "Custom Workflow Automation", description: "Design and deploy complex multi-step workflows tailored to your unique business processes." },
    { icon: Zap, title: "80% Manual Effort Reduction", description: "Automate repetitive tasks across departments, freeing teams for high-value work." },
    { icon: Shield, title: "Error Elimination", description: "Standardized processes remove human error from data entry, routing, and validation." },
    { icon: RotateCcw, title: "Continuous Improvement", description: "Built-in analytics identify bottlenecks and suggest optimization opportunities." },
    { icon: Rocket, title: "Rapid Deployment", description: "Pre-built templates and no-code builder deploy workflows in days, not months." },
    { icon: BarChart3, title: "Real-Time Monitoring", description: "Live dashboards track process health, SLA compliance, and team performance." },
  ];

  const integrations = [
    { name: "Salesforce", category: "CRM" },
    { name: "HubSpot", category: "Marketing" },
    { name: "Slack", category: "Communication" },
    { name: "Microsoft Teams", category: "Communication" },
    { name: "Jira", category: "Project Mgmt" },
    { name: "SAP", category: "ERP" },
    { name: "Oracle NetSuite", category: "ERP" },
    { name: "Zendesk", category: "Support" },
    { name: "Custom APIs", category: "Integration" },
  ];

  const benefits = [
    { icon: Clock, title: "Time Savings", metric: "80%", description: "Reduction in manual process time" },
    { icon: CheckCircle2, title: "Accuracy", metric: "99.9%", description: "Process execution accuracy rate" },
    { icon: Zap, title: "Speed", metric: "5×", description: "Faster process completion" },
    { icon: Shield, title: "Compliance", metric: "100%", description: "Audit trail coverage" },
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
            name: "Business Process Automation",
            serviceType: "Workflow Automation",
            description:
              "Automate repetitive workflows, reduce manual effort by 80%, and improve accuracy with custom business process automation solutions.",
            provider: {
              "@type": "Organization",
              name: "Islah Web Service",
              url: "https://www.islahwebservice.com",
            },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/services/business-process-automation",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-orange-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-orange-500" />
                </span>
                Step 3 of AI Lead Generation System
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Automated Outreach +
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Follow-Up
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Personalized cold email sequences, automated follow-ups, and CRM-ready workflows that turn leads into booked meetings on autopilot. This completes the system from discovery to conversion.
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
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Key Benefits */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-orange-500/15 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="h-7 w-7 sm:h-8 sm:w-8 text-orange-400" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{benefit.metric}</div>
                <div className="text-sm text-slate-400">{benefit.description}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Automation Capabilities
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive automation platform built for enterprise scale and flexibility.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400" />
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

      {/* Related Services */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.06),transparent_55%)]" />
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
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Seamless Integrations
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Connect with your existing stack. 50+ pre-built connectors and custom API support.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="p-4 sm:p-6 text-center border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all duration-300">
                <div className="text-lg sm:text-xl font-semibold text-white">{integration.name}</div>
                <div className="text-xs text-slate-400 mt-1">{integration.category}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Automate Your Operations?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Start with a free process audit. We'll identify your highest-impact automation opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Free Process Audit</Link>
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
