import { Link, useLocation } from "react-router-dom";
import { LucideIcon, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface AppSidebarProps {
  items: SidebarItem[];
  open: boolean;
  onClose: () => void;
  role: string;
}

export function AppSidebar({ items, open, onClose, role }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 sidebar-gradient flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-sidebar-primary" />
            <span className="text-base font-bold text-sidebar-primary-foreground">ArabicLearn</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-sidebar-accent transition-colors">
            <X className="h-5 w-5 text-sidebar-foreground" />
          </button>
        </div>

        <div className="px-3 py-2">
          <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 px-2">{role}</span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {items.map((item) => {
            const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path + "/"));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/40">© 2026 ArabicLearn</p>
        </div>
      </aside>
    </>
  );
}
