import { Link, useLocation } from "react-router-dom";
import { LucideIcon, X } from "lucide-react";
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
  teacher: "bg-[hsl(42_28%_97%)]",
  student: "bg-[hsl(42_28%_97%)]",
  admin: "bg-[hsl(42_28%_97%)]",
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
          "fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[17.5rem] flex flex-col transition-transform duration-300 ease-out",
          shellByVariant[variant],
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-full px-4 py-4">
          <div className="h-full rounded-[1.75rem] border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_24px_70px_-48px_hsl(160_35%_18%/0.14)] backdrop-blur-xl">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[hsl(160_25%_28%/0.12)]">
              <Link to="/" className="flex items-center min-w-0">
                <img src="/logo1.svg" alt="NeoArabi" className="h-7 w-auto object-contain" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden p-2 rounded-xl hover:bg-[hsl(42_40%_99%/0.7)] transition-colors"
              >
                <X className="h-5 w-5 text-foreground/70" />
              </button>
            </div>

            <div className="px-5 pt-5 pb-3">
              <span className="text-[10px] uppercase tracking-[0.24em] text-foreground/55 font-semibold">{role}</span>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
              {items.map((item) => {
                const active =
                  location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path + "/"));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-primary text-primary-foreground shadow-[0_18px_50px_-28px_hsl(160_40%_30%/0.25)]"
                        : "text-foreground/70 hover:bg-[hsl(42_40%_99%/0.7)] hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary-foreground" : "opacity-85")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-5 border-t border-[hsl(160_25%_28%/0.12)]">
              <p className="text-[11px] text-foreground/55 leading-relaxed">© 2026 NeoArabi</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
