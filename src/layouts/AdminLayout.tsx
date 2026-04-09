import { ReactNode, useState } from "react";
import { LayoutDashboard, Users, GraduationCap, Calendar, BarChart3, Settings } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";

const items: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Teachers", icon: GraduationCap, path: "/admin/teachers" },
  { label: "Students", icon: Users, path: "/admin/students" },
  { label: "Sessions", icon: Calendar, path: "/admin/sessions" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} userName="Admin" onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
