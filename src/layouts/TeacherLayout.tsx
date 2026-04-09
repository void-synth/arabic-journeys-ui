import { ReactNode, useState } from "react";
import { LayoutDashboard, Calendar, Users, ClipboardList, Bell, Settings } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";
import { AppAmbientBackground } from "@/components/visual/AppAmbientBackground";
import { currentTeacher } from "@/data/mock";

const items: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { label: "Sessions", icon: Calendar, path: "/teacher/sessions" },
  { label: "My learners", icon: Users, path: "/teacher/students" },
  { label: "Attendance", icon: ClipboardList, path: "/teacher/attendance" },
  { label: "Notifications", icon: Bell, path: "/teacher/notifications" },
  { label: "Settings", icon: Settings, path: "/teacher/settings" },
];

export function TeacherLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex w-full mesh-bg-teacher">
      <AppAmbientBackground variant="teacher" />
      <div className="relative z-10 flex min-h-screen w-full">
        <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Teacher" variant="teacher" />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={title}
            userName={currentTeacher.name}
            onMenuToggle={() => setSidebarOpen(true)}
            notificationAudience="teacher"
          />
          <main className="flex-1 animate-fade-in">{children}</main>
        </div>
      </div>
    </div>
  );
}
