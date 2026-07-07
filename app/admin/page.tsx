"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, FileText, TrendingUp, Plus, Edit, Trash2, Star } from "lucide-react";
import { listPortfolioItems } from "@/lib/actions/portfolio";
import { listBlogPosts } from "@/lib/actions/blog";
import type { BlogPost } from "@/lib/db/schema";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    portfolioItems: 0,
    blogPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [portfolioData, blogData] = await Promise.all([
        listPortfolioItems(),
        listBlogPosts(),
      ]);

      const publishedCount = blogData.filter((post: BlogPost) => post.published).length;

      setStats({
        portfolioItems: portfolioData.length,
        blogPosts: blogData.length,
        publishedPosts: publishedCount,
        totalViews: 0,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Overview of your website content and performance
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-3">
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Link href="/admin/blog-generator">
              <Plus className="h-4 w-4 mr-2" />
              Generate Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Building2,
            label: "Portfolio Items",
            value: stats.portfolioItems,
            color: "from-blue-500/20 to-cyan-500/20",
            borderColor: "border-blue-500/30",
            textColor: "text-blue-700 dark:text-blue-300",
          },
          {
            icon: FileText,
            label: "Total Blog Posts",
            value: stats.blogPosts,
            color: "from-purple-500/20 to-pink-500/20",
            borderColor: "border-purple-500/30",
            textColor: "text-purple-700 dark:text-purple-300",
          },
          {
            icon: Star,
            label: "Published Posts",
            value: stats.publishedPosts,
            color: "from-green-500/20 to-emerald-500/20",
            borderColor: "border-green-500/30",
            textColor: "text-green-700 dark:text-green-300",
          },
          {
            icon: TrendingUp,
            label: "Views This Month",
            value: stats.totalViews,
            color: "from-orange-500/20 to-red-500/20",
            borderColor: "border-orange-500/30",
            textColor: "text-orange-700 dark:text-orange-300",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <SectionReveal key={index} delay={index * 0.1}>
              <Card className={`hover:shadow-lg transition-shadow ${stat.borderColor} backdrop-blur-sm`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.textColor.split(' ')[0]}`} />
                    </div>
                    {loading ? (
                      <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ) : (
                      <div className={`text-3xl font-bold ${stat.textColor}`}>
                        {stat.value}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {stat.label}
                  </h3>
                </CardContent>
              </Card>
            </SectionReveal>
          );
        })}
      </div>

      {/* Quick Actions */}
      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            href: "/admin/portfolio",
            label: "Add New Portfolio Item",
            description: "Create a new project showcase",
            icon: Building2,
            color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
          },
          {
            href: "/admin/blog",
            label: "Create New Blog Post",
            description: "Write and publish new content",
            icon: FileText,
            color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
          },
          {
            href: "/admin/blog-generator",
            label: "Generate Blog with AI",
            description: "Use AI to create content from keywords",
            icon: TrendingUp,
            color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
          },
          {
            href: "/admin/settings",
            label: "Edit Site Settings",
            description: "Update header, footer, and general settings",
            icon: Edit,
            color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
          },
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {action.label}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </SectionReveal>

      {/* Content Management */}
      <SectionReveal>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Content Overview
            </CardTitle>
            <CardDescription>
              Summary of your website's content performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {stats.publishedPosts > 0 ? Math.round((stats.publishedPosts / Math.max(stats.blogPosts, 1)) * 100) : 0}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Published Posts
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {stats.publishedPosts} of {stats.blogPosts}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.portfolioItems}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Portfolio Items
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  All time
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  TBD
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  User Engagement
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Analytics coming soon
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SectionReveal>
    </div>
  );
}