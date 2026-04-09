import { Link, useLocation } from "react-router-dom";
import { LucideIcon, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

export type SidebarRoleVariant = "teacher" | "student" | "admin";

interface AppSidebarProps {
  items: SidebarItem[];
  open: boolean;
  onClose: () => void;
  role: string;
  variant?: SidebarRoleVariant;
}

const shellByVariant: Record<SidebarRoleVariant, string> = {
  teacher:
    "bg-gradient-to-b from-[hsl(160_28%_94%)] via-[hsl(42_30%_97%)] to-[hsl(42_28%_96%)]",
  student:
    "bg-gradient-to-b from-[hsl(230_28%_95%)] via-[hsl(42_30%_97%)] to-[hsl(42_28%_96%)]",
  admin: "bg-gradient-to-b from-[hsl(220_22%_95%)] via-[hsl(42_30%_97%)] to-[hsl(42_26%_96%)]",
};

export function AppSidebar({ items, open, onClose, role, variant = "teacher" }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className={cn("fixed inset-0 z-40 lg:hidden glass-overlay-scrim")}
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[17rem] flex flex-col transition-transform duration-300 ease-out border-r border-sidebar-border bg-sidebar shadow-[8px_0_32px_-12px_hsl(220_25%_30%/0.08)]",
          shellByVariant[variant],
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/80 shadow-sm ring-1 ring-slate-200/80">
              <BookOpen className="h-4 w-4 text-primary" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground font-display">ArabicLearn</span>
          </Link>
          <button type="button" onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <X className="h-5 w-5 text-sidebar-foreground" />
          </button>
        </div>

        <div className="px-4 pt-4 pb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-sidebar-muted font-semibold px-2">{role}</span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
          {items.map((item) => {
            const active =
              location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path + "/"));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-white shadow-sm ring-1 ring-slate-200/90 text-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "opacity-85")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-[11px] text-sidebar-muted leading-relaxed">© 2026 ArabicLearn</p>
        </div>
      </aside>
    </>
  );
}
