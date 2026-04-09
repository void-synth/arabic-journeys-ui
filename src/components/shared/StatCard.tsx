import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
  return (
    <div className={cn("glass-card rounded-[var(--radius-lg)] p-5 md:p-6", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">{title}</p>
          <p className="text-2xl md:text-3xl font-bold mt-1.5 text-foreground tabular-nums font-display">{value}</p>
          {trend && (
            <p className={cn("text-xs mt-2 font-medium", trendUp ? "text-emerald-700" : "text-rose-600")}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="stat-card-inner-icon shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
