import { cn } from "@/lib/utils";

type StatusType = "upcoming" | "ongoing" | "completed" | "cancelled" | "active" | "inactive" | "present" | "absent" | "late";

const statusStyles: Record<StatusType, string> = {
  upcoming: "bg-info/10 text-info",
  ongoing: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  present: "bg-success/10 text-success",
  absent: "bg-destructive/10 text-destructive",
  late: "bg-warning/10 text-warning",
};

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", statusStyles[status], className)}>
      {status}
    </span>
  );
}
