import { ReactNode, useState } from "react";
import { LayoutDashboard, Calendar, Bell, Settings } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";
import { AppAmbientBackground } from "@/components/visual/AppAmbientBackground";
import { currentStudent } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const items: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "My sessions", icon: Calendar, path: "/student/sessions" },
  { label: "Notifications", icon: Bell, path: "/student/notifications" },
  { label: "Settings", icon: Settings, path: "/student/settings" },
];

export function StudentLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate("/login");
  }

  return (
    <div className="relative min-h-screen flex w-full mesh-bg-student">
      <AppAmbientBackground variant="student" />
      <div className="relative z-10 flex min-h-screen w-full">
        <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Student" variant="student" />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={title}
            userName={auth.userName || currentStudent.name}
            onMenuToggle={() => setSidebarOpen(true)}
            notificationAudience="student"
            onLogout={handleLogout}
          />
          <main className="flex-1 animate-fade-in">{children}</main>
        </div>
      </div>
    </div>
  );
}
