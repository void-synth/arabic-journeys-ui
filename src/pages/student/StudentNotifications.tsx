import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { notificationsForAudience } from "@/data/mock";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = { info: Info, success: CheckCircle, warning: AlertTriangle };

export default function StudentNotifications() {
  return (
    <StudentLayout title="Notifications">
      <div className="page-container max-w-2xl">
        <PageHeader title="Notifications" description="Schedules, join links, and class updates." />
        <div className="space-y-2">
          {notificationsForAudience("student").map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div key={n.id} className={`glass-card flex items-start gap-3 rounded-xl p-4 ${!n.read ? "ring-2 ring-primary/20" : ""}`}>
                <Icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${n.type === "success" ? "text-success" : n.type === "warning" ? "text-warning" : "text-info"}`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
