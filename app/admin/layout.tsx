"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Authentication is enforced server-side in middleware.ts. The login page
  // renders standalone (without the admin chrome).
  if (pathname === "/admin/login") {
    return <>{children}</>;
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
