"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getAdminSettings, updateSettings } from "@/lib/actions/settings";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Islah Web Service",
    siteDescription: "B2B solutions for verified contact lists, lead generation, and business automation.",
    contactEmail: "info@islahwebservice.com",
    phone: "+1 (442) 222-8258",
    address: "",
    linkedinUrl: "",
    twitterUrl: "",
    resendApiKey: "",
    fromEmail: "",
    toEmail: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getAdminSettings();
      setSettings((prev) => ({
        ...prev,
        ...data,
      }));
    } catch {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(settings);
      toast({ title: "Settings saved" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Site Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your website configuration
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <SectionReveal>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => updateField("siteName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <Input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={settings.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={settings.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Site Description</label>
              <Textarea
                value={settings.siteDescription}
                onChange={(e) => updateField("siteDescription", e.target.value)}
                rows={2}
              />
            </div>
          </SectionReveal>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <SectionReveal>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Social Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input
                  value={settings.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter URL</label>
                <Input
                  value={settings.twitterUrl}
                  onChange={(e) => updateField("twitterUrl", e.target.value)}
                />
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <SectionReveal>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Email / Resend Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resend API Key</label>
                <Input
                  type="password"
                  value={settings.resendApiKey}
                  onChange={(e) => updateField("resendApiKey", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">From Email</label>
                <Input
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) => updateField("fromEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Email</label>
                <Input
                  type="email"
                  value={settings.toEmail}
                  onChange={(e) => updateField("toEmail", e.target.value)}
                />
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-cyan-600 hover:bg-cyan-700">
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
