import { ReactNode, useState } from "react";
import { LayoutDashboard, Calendar, Users, ClipboardList, Bell, Settings, UserPlus, FileText } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";
import { currentTeacher } from "@/data/mock";

const items: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { label: "Sessions", icon: Calendar, path: "/teacher/sessions" },
  { label: "Students", icon: Users, path: "/teacher/students" },
  { label: "Attendance", icon: ClipboardList, path: "/teacher/attendance" },
  { label: "Notifications", icon: Bell, path: "/teacher/notifications" },
  { label: "Settings", icon: Settings, path: "/teacher/settings" },
];

export function TeacherLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Teacher" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} userName={currentTeacher.name} onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
