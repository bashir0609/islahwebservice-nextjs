"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { pushEvent } from "@/lib/analytics";
import { useToast } from "@/components/ui/use-toast";
import { submitSampleRequest, type SampleRequestData } from "@/lib/actions/sample-request";

const sampleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().optional(),
  industry: z.string().optional(),
  targetGeography: z.string().optional(),
  companySize: z.string().optional(),
  targetCompanyCriteria: z.string().optional(),
  technologies: z.string().optional(),
  fundingRequirements: z.string().optional(),
  hiringCriteria: z.string().optional(),
  decisionMakerRoles: z.string().optional(),
  requiredFields: z.string().optional(),
  projectSize: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type SampleFormData = z.infer<typeof sampleFormSchema>;

const industries = [
  "SaaS & Technology",
  "Managed IT Services (MSP)",
  "Recruitment & Staffing",
  "Professional Services",
  "Manufacturing",
  "Real Estate & Property",
  "Healthcare",
  "Finance & Insurance",
  "Other",
];

const companySizes = ["1–10 employees", "11–50", "51–200", "201–500", "501–1,000", "1,000+", "Not sure yet"];

const projectSizes = [
  "Sample first (20 records)",
  "Small (up to 1,000 records)",
  "Medium (1,000–5,000 records)",
  "Large (5,000+ records)",
  "Not sure yet — recommend a size",
];

export default function RequestSamplePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", company: "" },
  });

  const selectedIndustry = watch("industry");
  const selectedCompanySize = watch("companySize");
  const selectedProjectSize = watch("projectSize");

  const onSubmit = async (data: SampleRequestData) => {
    setIsSubmitting(true);
    pushEvent("sample_request_submit_started", { company: data.company, industry: data.industry });

    try {
      const result = await submitSampleRequest(data);
      if (result.success) {
        pushEvent("sample_request_submitted", { company: data.company, industry: data.industry });
        toast({
          title: "Sample Request Received",
          description: result.message + " We'll reply within 24 hours with a sample built around your criteria.",
          variant: "success",
        });
        reset();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send request";
      pushEvent("sample_request_error", { error: message });
      toast({ title: "Failed to Send", description: message, variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-lg border transition-colors",
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20",
    );

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <Sparkles className="h-4 w-4" />
                Free · No obligation · Your criteria stay private
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl">
                Request a Free
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                  Prospect Research Sample
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-10 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Share your targeting criteria and we&apos;ll research a small sample of companies and
                decision-makers matching them — so you can judge the data quality before starting a full project.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Sample built around your criteria
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified contacts &amp; emails
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                CRM-ready formatting
              </span>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Criteria-Matched Companies",
                desc: "Real companies researched against the targeting criteria you provide — industry, geography, size, tech, funding, and more.",
              },
              {
                icon: Users,
                title: "Requested Decision-Makers",
                desc: "Current people matching the roles you ask for, with names, titles, and seniority verified across sources.",
              },
              {
                icon: FileSpreadsheet,
                title: "Verified, CRM-Ready Data",
                desc: "Business emails and LinkedIn profiles with verification status, delivered in the format your workflow needs.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.title} delay={index * 0.1} className="h-full">
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample request form */}
      <section id="sample-form" className="relative overflow-hidden scroll-mt-20 py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Tell Us Who You Want to Reach
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The more targeting detail you provide, the more useful the sample will be. Fields you skip can be refined later.
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
                      <Input id="name" {...register("name")} className={inputClass(!!errors.name)} placeholder="John Doe" />
                      {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <Input id="email" type="email" {...register("email")} className={inputClass(!!errors.email)} placeholder="john@company.com" />
                      {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300">
                        Company <span className="text-red-400">*</span>
                      </label>
                      <Input id="company" {...register("company")} className={inputClass(!!errors.company)} placeholder="Your Company LLC" />
                      {errors.company && <p className="text-sm text-red-400">{errors.company.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-sm font-medium text-slate-300">
                        Website
                      </label>
                      <Input id="website" {...register("website")} className={inputClass(false)} placeholder="yourcompany.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="industry" className="block text-sm font-medium text-slate-300">
                        Industry
                      </label>
                      <Select value={selectedIndustry} onValueChange={(value) => setValue("industry", value)}>
                        <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white transition-colors [&>span]:text-white">
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-slate-900 text-white">
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry} className="focus:bg-cyan-500/20 focus:text-white text-slate-200">
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="targetGeography" className="block text-sm font-medium text-slate-300">
                        Target Geography
                      </label>
                      <Input id="targetGeography" {...register("targetGeography")} className={inputClass(false)} placeholder="e.g. Texas, USA · London, UK · Sydney, AU" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="companySize" className="block text-sm font-medium text-slate-300">
                        Company Size
                      </label>
                      <Select value={selectedCompanySize} onValueChange={(value) => setValue("companySize", value)}>
                        <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white transition-colors [&>span]:text-white">
                          <SelectValue placeholder="Select a size range" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-slate-900 text-white">
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size} className="focus:bg-cyan-500/20 focus:text-white text-slate-200">
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="technologies" className="block text-sm font-medium text-slate-300">
                        Technologies Used
                      </label>
                      <Input id="technologies" {...register("technologies")} className={inputClass(false)} placeholder="e.g. NetSuite, Salesforce, HubSpot" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="targetCompanyCriteria" className="block text-sm font-medium text-slate-300">
                      Target Company Criteria
                    </label>
                    <Textarea
                      id="targetCompanyCriteria"
                      {...register("targetCompanyCriteria")}
                      className={cn(inputClass(false), "min-h-[100px]")}
                      placeholder="Describe the companies you want to reach — industry, revenue, location, funding stage, hiring activity, office footprint, or anything else that matters..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fundingRequirements" className="block text-sm font-medium text-slate-300">
                        Funding Requirements
                      </label>
                      <Input id="fundingRequirements" {...register("fundingRequirements")} className={inputClass(false)} placeholder="e.g. funded in the last 18 months" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="hiringCriteria" className="block text-sm font-medium text-slate-300">
                        Hiring Criteria
                      </label>
                      <Input id="hiringCriteria" {...register("hiringCriteria")} className={inputClass(false)} placeholder="e.g. recently hired SDRs, active engineering roles" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="decisionMakerRoles" className="block text-sm font-medium text-slate-300">
                        Desired Decision-Maker Roles
                      </label>
                      <Input id="decisionMakerRoles" {...register("decisionMakerRoles")} className={inputClass(false)} placeholder="e.g. VP Sales, IT Director, HR Director" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="requiredFields" className="block text-sm font-medium text-slate-300">
                        Required Data Fields
                      </label>
                      <Input id="requiredFields" {...register("requiredFields")} className={inputClass(false)} placeholder="e.g. name, title, email, LinkedIn, phone, revenue" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectSize" className="block text-sm font-medium text-slate-300">
                      Approximate Project Size
                    </label>
                    <Select value={selectedProjectSize} onValueChange={(value) => setValue("projectSize", value)}>
                      <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white transition-colors [&>span]:text-white">
                        <SelectValue placeholder="Select a project size" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-900 text-white">
                        {projectSizes.map((size) => (
                          <SelectItem key={size} value={size} className="focus:bg-cyan-500/20 focus:text-white text-slate-200">
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-slate-300">
                      Additional Notes
                    </label>
                    <Textarea
                      id="additionalNotes"
                      {...register("additionalNotes")}
                      className={cn(inputClass(false), "min-h-[100px]")}
                      placeholder="Anything else we should know about the sample, your workflow, or delivery format..."
                    />
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
                        Request My Free Sample
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    Free · No credit card required · We research the sample before any commitment
                  </p>
                </form>
              </Card>
            </SectionReveal>

            {/* Sidebar */}
            <SectionReveal delay={0.4} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Why Request a Sample First?</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    A sample lets you verify the research quality, data fields, and formatting before
                    committing to a full project — with no obligation to continue.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Target, label: "Built From Your Criteria", description: "Companies and contacts matched to the requirements you provide." },
                    { icon: ShieldCheck, label: "Verified Before Delivery", description: "Emails and roles checked against the sources available at research time." },
                    { icon: Mail, label: "Replies Within 24 Hours", description: "We review your criteria and respond with a scoped sample plan." },
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
                  <h3 className="text-xl font-bold text-white mb-3">Prefer to Talk First?</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    A short consultation is optional. If you&apos;d rather discuss your target market before
                    requesting a sample, you can book one — but it&apos;s never required.
                  </p>
                  <Button asChild variant="outline" className="w-full border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                    <Link href="/free-consultation">
                      Book a Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>

                <Card className="p-8 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-3">Prefer to Reach Us Directly?</h3>
                  <a
                    href="mailto:hello@islahwebservice.com"
                    onClick={() => pushEvent("email_click", { type: "request_sample" })}
                    className="text-cyan-400 hover:underline text-sm"
                  >
                    hello@islahwebservice.com
                  </a>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
