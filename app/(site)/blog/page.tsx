"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Calendar, Tag, Search } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { listBlogPosts } from "@/lib/actions/blog";
import type { BlogPost } from "@/lib/db/schema";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await listBlogPosts();
      const publishedPosts = data.filter((post: BlogPost) => post.published);
      setPosts(publishedPosts);
    };
    fetchPosts();
  }, []);

  const parseTags = (tags: unknown): string[] => {
    try {
      const parsed = typeof tags === "string" ? JSON.parse(tags) : tags;
      return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
    } catch {
      return [];
    }
  };

  const allTags = [
    "All",
    ...Array.from(new Set(posts.flatMap((post) => parseTags(post.tags)))).sort(),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTag === "All") return matchesSearch;

    return matchesSearch && parseTags(post.tags).includes(selectedTag);
  });

  return (
    <main className="flex flex-col">
      {/* Hero Section — dark editorial hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                <Tag className="h-4 w-4" />
                The Islah Journal
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl">
                Fresh insights for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                  B2B growth teams
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Practical, tested guidance on B2B prospecting, verified data, and
                outbound campaigns — written by the team that builds prospect lists
                and runs lead generation for sales teams every day.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.7} className="mt-8">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/b2b-lead-generation", label: "B2B Lead Generation" },
                  { href: "/prospect-list-building", label: "Prospect Lists" },
                  { href: "/contact-enrichment", label: "Contact Enrichment" },
                  { href: "/industries/saas", label: "SaaS" },
                  { href: "/industries/msp", label: "MSP" },
                  { href: "/free-consultation", label: "Free Consultation" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Tags */}
          <SectionReveal delay={0.2} className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedTag === tag
                        ? "bg-cyan-600 text-white shadow-lg border-cyan-600"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const tags: string[] = parseTags(post.tags);
                return (
                  <StaggerItem key={post.id} className="group">
                    <Card className="overflow-hidden h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-slate-900 to-teal-500/25 group-hover:scale-110 transition-transform duration-700" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                      </div>

                      <CardHeader className="p-6 pb-4 flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="mt-2 text-slate-400 line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.createdAt ? formatDate(post.createdAt) : ""}</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-cyan-400 font-medium hover:underline"
                        >
                          Read more
                        </Link>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <SectionReveal className="text-center py-12">
              <p className="text-xl text-slate-400">
                No articles found matching your criteria.
              </p>
            </SectionReveal>
          )}
        </div>
      </section>
    </main>
  );
}
