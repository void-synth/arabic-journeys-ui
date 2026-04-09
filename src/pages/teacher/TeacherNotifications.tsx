import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { notifications } from "@/data/mock";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = { info: Info, success: CheckCircle, warning: AlertTriangle };

export default function TeacherNotifications() {
  return (
    <TeacherLayout title="Notifications">
      <div className="page-container max-w-2xl">
        <PageHeader title="Notifications" description="Stay updated on your sessions and students" />
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <div key={n.id} className={`bg-card rounded-lg border border-border p-4 flex items-start gap-3 ${!n.read ? "border-l-4 border-l-primary" : ""}`}>
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${n.type === "success" ? "text-success" : n.type === "warning" ? "text-warning" : "text-info"}`} />
                <div>
                  <p className="font-medium text-foreground text-sm">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TeacherLayout>
  );
}
