"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "@/lib/actions/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MapPin,
  Users,
  TrendingUp,
} from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
    },
  });

  const selectedService = watch("service");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        toast({
          title: "Message Sent Successfully",
          description: result.message,
          variant: "success",
        });
        reset();
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message";
      toast({
        title: "Failed to Send Message",
        description: message,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "AI Lead Generation System",
    "Google Maps + Website Extraction",
    "AI Analysis + ICP Filtering",
    "Automated Outreach + Follow-Up",
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Start Your B2B
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Transformation
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-12 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Ready to accelerate your business? Get in touch with our B2B
                solutions experts today.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form Side */}
            <SectionReveal delay={0.2} className="lg:col-span-3">
              <Card className="p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                        placeholder="john@company.com"
                        type="email"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="company"
                      {...register("company")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors",
                        errors.company
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20",
                      )}
                      placeholder="Your Company LLC"
                    />
                    {errors.company && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Service Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Service Interest <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={selectedService}
                      onValueChange={(value) => setValue("service", value)}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.service
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20",
                        )}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border min-h-[120px] transition-colors",
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20",
                      )}
                      placeholder="Tell us about your business needs and goals..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full py-4 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Card>
            </SectionReveal>

            {/* Contact Info Side */}
            <SectionReveal delay={0.4} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Why Choose Us?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    We&apos;re not just another B2B data provider. We&apos;re
                    your strategic partner in growth, equipped with verified
                    contacts, intelligent analytics, and automation that scales
                    with your business.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: "Market Coverage",
                      description: "USA, UK & Australia",
                    },
                    {
                      icon: Users,
                      label: "Verified Contacts",
                      description: "99% accuracy guaranteed",
                    },
                    {
                      icon: TrendingUp,
                      label: "Proven ROI",
                      description: "8x average return on investment",
                    },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                            {feature.label}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Card className="p-8 rounded-xl bg-gradient-to-br from-cyan-600/10 to-teal-600/10 border-cyan-200 dark:border-cyan-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    Need Immediate Help?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Contact our B2B solutions team directly for urgent inquiries
                    or technical support.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Email:</span>
                      <a
                        href="mailto:hello@islahwebservice.com"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        hello@islahwebservice.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Phone:</span>
                      <a
                        href="tel:+1-442-222-8258"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        +1 (442) 222-8258
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
