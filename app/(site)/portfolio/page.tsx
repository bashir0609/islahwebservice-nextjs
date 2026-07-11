"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { listPortfolioItems } from "@/lib/actions/portfolio";
import type { PortfolioItem } from "@/lib/db/schema";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await listPortfolioItems();
      setProjects(data);
      setFilteredProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const tags = Array.from(
      new Set(
        projects
          .flatMap((p) => {
            try {
              const parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })
          .filter((tag): tag is string => typeof tag === "string" && Boolean(tag)),
      ),
    ).sort();
    const allTags = ["All", ...tags];
    setSelectedTag((prev) => (allTags.includes(prev) ? prev : "All"));
  }, [projects]);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          (project.description || "").toLowerCase().includes(searchLower),
      );
    }

    if (selectedTag !== "All") {
      filtered = filtered.filter((project) => {
        let projectTags: string[] = [];
        try {
          projectTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
        } catch {
          projectTags = [];
        }
        return projectTags.includes(selectedTag);
      });
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedTag, projects]);

  const allTags = [
    "All",
    ...Array.from(
      new Set(
        projects
          .flatMap((p) => {
            try {
              const parsed = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })
          .filter((tag): tag is string => typeof tag === "string" && Boolean(tag)),
      ),
    ).sort(),
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <MapPin className="h-4 w-4" />
                Client Success Stories
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Our
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Portfolio
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Explore how our B2B solutions drive real transformation for
                businesses across industries and regions.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover how our B2B solutions deliver measurable results and
              competitive advantages.
            </p>
          </SectionReveal>

          {/* Filters */}
          <SectionReveal delay={0.2} className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-cyan-600 text-white shadow-lg"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => {
                let tags: string[] = [];
                try {
                  tags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
                } catch {
                  tags = [];
                }
                return (
                  <StaggerItem key={project.id} className="group">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
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
                        <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                          {project.description}
                        </CardDescription>

                        <div className="flex items-center justify-between mb-6 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              <span>Industry</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>50+ Users</span>
                            </div>
                          </div>
                        </div>

                        {project.featured && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full border border-cyan-500/30">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                              Featured Project
                            </span>
                          </div>
                        )}
                      </CardContent>

                      <div className="px-8 pb-8 mt-auto">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full group-hover:bg-cyan-50 dark:group-hover:bg-slate-800 group-hover:border-cyan-200 transition-all"
                        >
                          <Link
                            href={`/portfolio/${project.id}`}
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
            <SectionReveal className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  No Projects Found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {projects.length === 0
                    ? "Our portfolio is growing. Check back soon for new projects."
                    : "No projects match your current filters. Try adjusting your search criteria."}
                </p>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>
    </main>
  );
}
