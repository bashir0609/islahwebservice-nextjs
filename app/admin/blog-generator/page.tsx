"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Wand2, Loader2 } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function AdminBlogGeneratorPage() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("llama-3.3-70b-versatile");
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("8");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [generatingKeywords, setGeneratingKeywords] = useState(false);
  const [generatingPost, setGeneratingPost] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [generatedPost, setGeneratedPost] = useState<{
    title: string;
    content: string;
    excerpt: string;
  } | null>(null);
  const { toast } = useToast();

  const handleGenerateKeywords = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingKeywords(true);
    setKeywords([]);
    setGeneratedPost(null);
    try {
      const res = await fetch("/api/generate-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, model, topic, count: Number(count) }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate keywords");
      }
      setKeywords(data.keywords || []);
      toast({ title: "Keywords generated" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate keywords",
        variant: "error",
      });
    } finally {
      setGeneratingKeywords(false);
    }
  };

  const handleGeneratePost = async (keyword: string) => {
    setSelectedKeyword(keyword);
    setGeneratingPost(true);
    setGeneratedPost(null);
    try {
      const res = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, model, topic: keyword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate post");
      }
      setGeneratedPost({
        title: data.title || keyword,
        content: data.content || "",
        excerpt: data.excerpt || "",
      });
      toast({ title: "Post generated" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate post",
        variant: "error",
      });
    } finally {
      setGeneratingPost(false);
    }
  };

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
          AI Blog Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Generate SEO-focused blog content from keywords
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <SectionReveal>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Groq Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Groq API Key</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Model</label>
              <Input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="llama-3.3-70b-versatile"
              />
            </div>
          </div>
        </SectionReveal>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <SectionReveal>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            1. Generate Keywords
          </h2>
          <form onSubmit={handleGenerateKeywords} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. B2B lead generation"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Keyword Count</label>
              <Input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={generatingKeywords || !apiKey || !topic}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {generatingKeywords ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Keywords
                </>
              )}
            </Button>
          </form>

          {keywords.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => handleGeneratePost(keyword)}
                    disabled={generatingPost}
                    className="px-3 py-1.5 rounded-full text-sm border border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-600 transition-colors disabled:opacity-50"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </SectionReveal>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        <SectionReveal>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            2. Generated Post
          </h2>
          {generatingPost && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating post for &quot;{selectedKeyword}&quot;...
            </div>
          )}

          {!generatingPost && !generatedPost && (
            <p className="text-sm text-slate-500">
              Select a keyword above to generate a full blog post.
            </p>
          )}

          {generatedPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={generatedPost.title} readOnly />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea value={generatedPost.excerpt} readOnly rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content (HTML)</label>
                <Textarea
                  value={generatedPost.content}
                  readOnly
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          )}
        </SectionReveal>
      </div>
    </div>
  );
}
