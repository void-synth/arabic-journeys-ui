import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className={cn(
        "glass-card relative overflow-hidden rounded-[var(--radius-lg)] p-5 md:p-6",
        "shadow-[0_22px_64px_-36px_hsl(160_35%_18%/0.16)] transition-all duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(160_45%_88%/0.3),transparent_42%)]" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 relative">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">{title}</p>
          <p className="text-2xl md:text-3xl font-bold mt-1.5 text-foreground tabular-nums font-display">{value}</p>
          {trend && (
            <p className={cn("text-xs mt-2 font-medium", trendUp ? "text-primary/80" : "text-foreground/60")}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="stat-card-inner-icon relative shrink-0 shadow-sm">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}
