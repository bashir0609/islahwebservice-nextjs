"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Calendar, Search } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/db/schema";

function parseTags(tags: unknown): string[] {
  try {
    const parsed = typeof tags === "string" ? JSON.parse(tags) : tags;
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === "string")
      : [];
  } catch {
    return [];
  }
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = [
    "All",
    ...Array.from(new Set(posts.flatMap((post) => parseTags(post.tags)))).sort(),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTag === "All") return matchesSearch;

    return matchesSearch && parseTags(post.tags).includes(selectedTag);
  });

  return (
    <>
      {/* Search and Tags */}
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

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const tags = parseTags(post.tags);
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
        <div className="text-center py-12">
          <p className="text-xl text-slate-400">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </>
  );
}
