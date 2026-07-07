"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check for admin auth cookie or localStorage
    const checkAuth = () => {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('admin_auth='));
      const localAuth = localStorage.getItem('admin_auth');
      return cookie || localAuth;
    };

    // On login page, skip auth check and show children immediately
    if (pathname === '/admin/login') {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    if (!checkAuth()) {
      redirect('/admin/login');
    }

    setIsAuthenticated(true);
    setLoading(false);
  }, [pathname]);

  // Don't show loading spinner on login page - render children immediately
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        <div className="mx-auto max-w-7xl p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  );
}