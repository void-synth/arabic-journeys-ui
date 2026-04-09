import { ReactNode, useState } from "react";
import { LayoutDashboard, Calendar, Bell, Settings } from "lucide-react";
import { AppSidebar, SidebarItem } from "@/components/shared/AppSidebar";
import { Navbar } from "@/components/shared/Navbar";
import { currentStudent } from "@/data/mock";

const items: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Session History", icon: Calendar, path: "/student/sessions" },
  { label: "Notifications", icon: Bell, path: "/student/notifications" },
  { label: "Settings", icon: Settings, path: "/student/settings" },
];

export function StudentLayout({ children, title }: { children: ReactNode; title: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar items={items} open={sidebarOpen} onClose={() => setSidebarOpen(false)} role="Student" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} userName={currentStudent.name} onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
