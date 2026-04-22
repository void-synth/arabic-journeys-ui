import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAudienceNotificationsRead, markNotificationRead } from "@/lib/notificationStore";
import { useStoredNotifications } from "@/lib/useStoredNotifications";

const iconMap = { info: Info, success: CheckCircle, warning: AlertTriangle };

export default function StudentNotifications() {
  const rows = useStoredNotifications("student");
  const unread = rows.filter((row) => !row.read).length;

  return (
    <StudentLayout title="Notifications">
      <div className="page-container max-w-2xl">
        <PageHeader
          title="Notifications"
          description="Schedules, join links, and class updates."
          actions={
            <Button type="button" variant="outline" onClick={() => markAudienceNotificationsRead("student", true)} disabled={unread === 0}>
              Mark all read
            </Button>
          }
        />
        <div className="space-y-2">
          {rows.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <button
                type="button"
                key={n.id}
                onClick={() => markNotificationRead(n.id, !n.read)}
                className={`glass-card w-full text-left flex items-start gap-3 rounded-xl p-4 ${!n.read ? "ring-2 ring-primary/20" : ""}`}
              >
                <Icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${n.type === "success" ? "text-success" : n.type === "warning" ? "text-warning" : "text-info"}`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
