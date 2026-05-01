import { LogOut, Menu, Search, User } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import type { NotificationAudience } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  title: string;
  userName: string;
  userAvatar?: string;
  onMenuToggle: () => void;
  notificationAudience: NotificationAudience;
  onLogout?: () => void;
}

export function Navbar({ title, userName, userAvatar, onMenuToggle, notificationAudience, onLogout }: NavbarProps) {
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="-ml-1 rounded-xl p-2 transition-colors hover:bg-[hsl(42_40%_99%/0.7)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="min-w-0">
            <h2 className="truncate font-display text-base font-normal tracking-tight text-foreground sm:text-lg">{title}</h2>
          </div>
        </div>

        <div className="hidden flex-1 md:flex justify-center">
          <div className="relative w-full max-w-[560px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" aria-hidden />
            <Input
              type="search"
              placeholder="Search"
              className="h-11 rounded-[999px] border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.7)] pl-11 pr-4 text-sm text-foreground placeholder:text-foreground/45 shadow-[0_18px_55px_-40px_hsl(160_35%_18%/0.12)] focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <NotificationDropdown audience={notificationAudience} />
          <div className="flex items-center gap-2 rounded-[999px] border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.65)] px-2 py-1.5 shadow-[0_18px_55px_-44px_hsl(160_35%_18%/0.12)]">
            <Avatar className="h-8 w-8 ring-1 ring-[hsl(160_25%_28%/0.12)] bg-primary/10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                {initials || <User className="h-4 w-4 text-primary" />}
              </AvatarFallback>
            </Avatar>
            <span className="hidden max-w-[160px] truncate text-sm font-medium text-foreground sm:inline">{userName}</span>
            {onLogout ? (
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1 rounded-[999px] px-2 py-1 text-xs font-medium text-foreground/60 transition-colors hover:bg-[hsl(42_40%_99%/0.7)] hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
