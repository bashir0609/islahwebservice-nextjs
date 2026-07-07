import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 md:ml-64">
        <div className="mx-auto max-w-7xl p-4 md:p-8 pt-16 md:pt-8">{children}</div>
      </div>
    </div>
  );
}
