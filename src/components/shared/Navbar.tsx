import { LogOut, Menu, User } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import type { NotificationAudience } from "@/data/mock";

interface NavbarProps {
  title: string;
  userName: string;
  onMenuToggle: () => void;
  notificationAudience: NotificationAudience;
  onLogout?: () => void;
}

export function Navbar({ title, userName, onMenuToggle, notificationAudience, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/80 bg-background/80 px-4 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="-ml-1 rounded-xl p-2 transition-colors hover:bg-muted/80 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <div className="min-w-0">
          <h2 className="truncate font-display text-base font-normal tracking-tight text-foreground sm:text-lg">{title}</h2>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <NotificationDropdown audience={notificationAudience} />
        <div className="ml-1 flex items-center gap-2 border-l border-border pl-2 sm:pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-border/80">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="hidden max-w-[140px] truncate text-sm font-medium text-foreground sm:inline">{userName}</span>
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
