import { cn } from "@/lib/utils";

type StatusType = "upcoming" | "ongoing" | "completed" | "cancelled" | "active" | "inactive" | "present" | "absent" | "late";

const statusStyles: Record<StatusType, string> = {
  upcoming: "border border-primary/20 bg-primary/10 text-primary",
  ongoing: "border border-primary/25 bg-primary/15 text-primary",
  completed: "border border-primary/20 bg-primary/10 text-primary/90",
  cancelled: "border border-primary/20 bg-primary/10 text-primary/75",
  active: "border border-primary/20 bg-primary/10 text-primary/90",
  inactive: "border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] text-foreground/60",
  present: "border border-primary/20 bg-primary/10 text-primary/90",
  absent: "border border-primary/20 bg-primary/10 text-primary/75",
  late: "border border-primary/25 bg-primary/15 text-primary",
};

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
