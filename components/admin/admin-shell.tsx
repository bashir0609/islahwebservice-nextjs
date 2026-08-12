"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Authentication is enforced server-side in proxy.ts. The login page
  // renders standalone (without the admin chrome).
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      {/* The sidebar (w-64) is already a flex item in normal flow — no extra
          left margin, which previously pushed content 256px past it. */}
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  );
}
