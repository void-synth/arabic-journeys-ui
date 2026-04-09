import { Bell } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/data/mock";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-80 z-50 glass-dropdown rounded-lg p-2 max-h-96 overflow-y-auto">
            <p className="text-sm font-semibold text-foreground px-2 py-1.5">Notifications</p>
            {notifications.map((n) => (
              <div key={n.id} className={`px-3 py-2.5 rounded-md text-sm hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                <p className="font-medium text-foreground">{n.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{n.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
