import { ReactNode, useState } from "react";
import { LayoutDashboard, Users, GraduationCap, Calendar, BarChart3, Settings } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";
import { AppAmbientBackground } from "@/components/visual/AppAmbientBackground";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const items: SidebarItem[] = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Teachers", icon: GraduationCap, path: "/admin/teachers" },
  { label: "Learners", icon: Users, path: "/admin/students" },
  { label: "Sessions", icon: Calendar, path: "/admin/sessions" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate("/login");
  }

  return (
    <div className="relative min-h-screen flex w-full mesh-bg-admin">
      <AppAmbientBackground variant="admin" />
      <div className="relative z-10 flex min-h-screen w-full">
        <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Platform admin" variant="admin" />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={title}
            userName={auth.userName || "Platform admin"}
            onMenuToggle={() => setSidebarOpen(true)}
            notificationAudience="admin"
            onLogout={handleLogout}
          />
          <main className="flex-1 animate-fade-in">{children}</main>
        </div>
      </div>
    </div>
  );
}
