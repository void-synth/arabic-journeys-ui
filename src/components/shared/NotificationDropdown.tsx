import { Bell } from "lucide-react";
import { useState } from "react";
import { notificationsForAudience, type NotificationAudience } from "@/data/mock";
import { cn } from "@/lib/utils";

export function NotificationDropdown({ audience }: { audience: NotificationAudience }) {
  const [open, setOpen] = useState(false);
  const list = notificationsForAudience(audience);
  const unread = list.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "relative p-2 rounded-xl transition-colors",
          open ? "bg-muted/80" : "hover:bg-muted/80"
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-h-[1rem] min-w-[1rem] px-0.5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Close notifications" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-[min(100vw-2rem,20rem)] z-50 glass-dropdown rounded-xl p-2 max-h-96 overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 py-2">Notifications</p>
            {list.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm transition-colors border border-transparent",
                  !n.read ? "bg-primary/5 border-primary/15" : "hover:bg-muted/50"
                )}
              >
                <p className="font-medium text-foreground leading-snug">{n.title}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
