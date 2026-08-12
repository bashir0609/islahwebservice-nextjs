"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Building2, Users, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/lib/db/schema";

function parseTags(tags: unknown): string[] {
  try {
    const parsed = typeof tags === "string" ? JSON.parse(tags) : tags;
    return Array.isArray(parsed)
      ? parsed.filter((tag): tag is string => typeof tag === "string" && Boolean(tag))
      : [];
  } catch {
    return [];
  }
}

export default function PortfolioGallery({
  projects,
}: {
  projects: PortfolioItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => parseTags(p.tags)))).sort(),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTag === "All") return matchesSearch;

    return matchesSearch && parseTags(project.tags).includes(selectedTag);
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
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

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const tags = parseTags(project.tags);
            return (
              <StaggerItem key={project.id} className="group">
                <Card className="overflow-hidden h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-cyan-500/90 text-white text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-8 flex-grow">
                    <CardDescription className="text-slate-400 leading-relaxed mb-6">
                      {project.description}
                    </CardDescription>

                    <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>Client Type</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Research Project</span>
                        </div>
                      </div>
                    </div>

                    {project.featured === 1 && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full border border-cyan-500/30">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                        <span className="text-sm font-medium text-cyan-400">
                          Featured Project
                        </span>
                      </div>
                    )}
                  </CardContent>

                  <div className="px-8 pb-8 mt-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-cyan-500/40 transition-all"
                    >
                      <Link
                        href={`/portfolio/${project.slug || project.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        View Case Study
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Projects Found
            </h3>
            <p className="text-slate-400">
              {projects.length === 0
                ? "Our case studies are growing. Check back soon for new projects."
                : "No projects match your current filters. Try adjusting your search criteria."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
