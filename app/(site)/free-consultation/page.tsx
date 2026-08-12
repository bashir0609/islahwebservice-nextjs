"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "@/lib/actions/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Loader2,
  Send,
} from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { pushEvent } from "@/lib/analytics";
import { useToast } from "@/components/ui/use-toast";

const consultationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

const services = [
  "B2B Prospect Research",
  "Existing Database Enrichment",
  "B2B Lead Generation Data Services",
  "Not sure yet — recommend a solution",
];

export default function FreeConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", company: "", service: "" },
  });

  const selectedService = watch("service");

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    pushEvent("consultation_form_submit_started", { service: data.service });

    try {
      const result = await submitContactForm(data);
      if (result.success) {
        pushEvent("consultation_form_submitted", { service: data.service, company: data.company });
        toast({
          title: "Request Received",
          description: result.message + " We'll typically reply within one business day to schedule your consultation.",
          variant: "success",
        });
        reset();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      pushEvent("consultation_form_error", { error: message });
      toast({ title: "Failed to Send", description: message, variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col">
      {/* Hero — free consultation promise */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Free 15-Minute Research Scoping Call
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Free Prospect Research
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
                  Consultation
                </span>
                <span className="block text-white">for Your Target Market</span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-10 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                A free, no-obligation strategy call where we discuss your targeting criteria, review what can be researched, and outline a customized prospect database for your project — even if you never hire us.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Button asChild size="lg">
                <Link href="#consultation-form">
                  Book My Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-emerald-400" />
                Typically replies within one business day
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.9} className="mt-6">
              <p className="text-sm text-slate-400">
                Prefer to skip the call?{" "}
                <Link href="/request-sample" className="text-cyan-400 hover:text-cyan-300 font-medium">
                  Request a free sample directly
                </Link>
                {" "}— no consultation required.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">What You&apos;ll Get</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Every consultation is designed to leave you with something actionable — whether or not we work together.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Clear Research Scope",
                desc: "We review your target criteria, confirm what can be researched, and outline the fields, verification, and delivery format available.",
              },
              {
                icon: ClipboardCheck,
                title: "Sample Data",
                desc: "Receive a small sample of prospect data for your criteria — see the actual quality before you commit to anything.",
              },
              {
                icon: TrendingUp,
                title: "Transparent Project Plan",
                desc: "A clear timeline, deliverable breakdown, and quote — built around your specific requirements, not a generic pitch.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.1} className="h-full">
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3} className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "15 min", label: "Focused strategy session" },
                { value: "$0", label: "No cost, no obligation" },
                { value: "1 day", label: "Typical response time" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Consultation form */}
      <section id="consultation-form" className="relative overflow-hidden scroll-mt-20 py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Book Your Free Consultation</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tell us about your target market and what you&apos;re looking for. We&apos;ll come prepared with ideas specific to your criteria.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <SectionReveal delay={0.2} className="lg:col-span-3">
              <Card className="p-8 md:p-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                        Business Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        id="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                        placeholder="john@company.com"
                        type="email"
                      />
                      {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="company"
                      {...register("company")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors",
                        errors.company
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20",
                      )}
                      placeholder="Your Company LLC"
                    />
                    {errors.company && <p className="text-sm text-red-400">{errors.company.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-slate-300">
                      What Do You Need? <span className="text-red-400">*</span>
                    </label>
                    <Select value={selectedService} onValueChange={(value) => setValue("service", value)}>
                      <SelectTrigger
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors text-white [&>span]:text-white",
                          errors.service
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-white/10 bg-white/5 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-900 text-white">
                        {services.map((service) => (
                          <SelectItem key={service} value={service} className="focus:bg-cyan-500/20 focus:text-white text-slate-200">
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-sm text-red-400">{errors.service.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                      Your Goals <span className="text-red-400">*</span>
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border min-h-[120px] transition-colors",
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20",
                      )}
                      placeholder="Tell us about your target market, company criteria, decision-maker roles, and any other research requirements..."
                    />
                    {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full py-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-4 w-4" />
                        Request My Free Consultation
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    Free · No credit card required · Your data stays private
                  </p>
                  <p className="text-center text-xs text-slate-500">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy-policy" className="text-cyan-400 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </Card>
            </SectionReveal>

            {/* Why book / contact info */}
            <SectionReveal delay={0.4} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Why Book a Call?</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Most providers sell volume. We build databases around your exact targeting criteria — and we&apos;re happy to prove it before you spend a cent.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Users, label: "For B2B Sales Teams", description: "MSPs, SaaS, recruitment, and professional services" },
                    { icon: CheckCircle2, label: "Multi-Step Verification", description: "Records verified against available checks at the time of delivery" },
                    { icon: MapPin, label: "USA, UK & Australia", description: "Research across three major markets" },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-500/40 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{feature.label}</h4>
                          <p className="text-sm text-slate-400">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Card className="p-8 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-4">Prefer to Reach Us Directly?</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <a
                        href="mailto:hello@islahwebservice.com"
                        onClick={() => pushEvent("email_click", { type: "free_consultation" })}
                        className="text-cyan-400 hover:underline"
                      >
                        hello@islahwebservice.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="h-4 w-4 text-cyan-400" />
                      <a
                        href="tel:+1-442-222-8258"
                        onClick={() => pushEvent("phone_click", { type: "free_consultation" })}
                        className="text-cyan-400 hover:underline"
                      >
                        +1 (442) 222-8258
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MessageSquare className="h-4 w-4 text-cyan-400" />
                      <span>Typically replies within one business day, Mon–Fri</span>
                    </div>
                  </div>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Consultation FAQs</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to know before the call.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {[
              {
                q: "Is the consultation really free?",
                a: "Yes — completely free with no obligation. We discuss your targeting criteria, confirm what can be researched, and outline a project scope because we're confident the quality of our work will speak for itself.",
              },
              {
                q: "What happens on the call?",
                a: "We'll discuss your target market, company criteria, and decision-maker requirements, confirm what's researchable, and outline a project plan with timeline and pricing. You leave with a clear understanding of what's possible.",
              },
              {
                q: "How long does the consultation last?",
                a: "About 15 minutes — enough time for a focused, useful conversation without eating into your day. If you'd like to go deeper, we can extend it.",
              },
              {
                q: "Do I have to buy anything after?",
                a: "No. The project scope is yours to keep and execute yourself. Many clients do choose to work with us after seeing the plan, but there's zero pressure.",
              },
              {
                q: "Which markets do you cover?",
                a: "We regularly research the USA, UK, and Australia, and can support research in other English-speaking markets on request.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
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

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to See the Quality of Our Research?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Book a free consultation and get a sample of prospect data for your target criteria — even if you never hire us.
            </p>
            <Button asChild size="lg">
              <Link href="#consultation-form">
                Book My Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-slate-400">Free · No obligation · Sample data available</p>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
