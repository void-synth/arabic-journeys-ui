import { Bell } from "lucide-react";
import { type NotificationAudience } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoredNotifications } from "@/lib/useStoredNotifications";
import { markAudienceNotificationsRead, markNotificationRead } from "@/lib/notificationStore";
import { Button } from "@/components/ui/button";

export function NotificationDropdown({ audience }: { audience: NotificationAudience }) {
  const list = useStoredNotifications(audience);
  const unread = list.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative p-2 rounded-xl transition-colors outline-none hover:bg-[hsl(42_40%_99%/0.7)]",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-expanded={undefined}
          aria-haspopup="dialog"
        >
          <Bell className="h-5 w-5 text-foreground/55" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-h-[1rem] min-w-[1rem] px-0.5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[min(100vw-2rem,20rem)] p-2 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between px-2 py-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/55">Notifications</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[11px]"
            onClick={() => markAudienceNotificationsRead(audience, true)}
            disabled={unread === 0}
          >
            Mark all read
          </Button>
        </div>
        {list.map((n) => (
          <button
            type="button"
            key={n.id}
            onClick={() => markNotificationRead(n.id, true)}
            className={cn(
              "w-full px-3 py-2.5 rounded-lg text-left text-sm transition-colors border border-transparent",
              !n.read ? "bg-primary/10 border-primary/20" : "hover:bg-[hsl(42_40%_99%/0.6)]"
            )}
          >
            <p className="font-medium text-foreground leading-snug">{n.title}</p>
            <p className="text-foreground/60 text-xs mt-1 leading-relaxed">{n.message}</p>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
