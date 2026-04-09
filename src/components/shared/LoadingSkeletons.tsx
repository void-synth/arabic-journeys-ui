import { Skeleton } from "@/components/ui/skeleton";

/** Static loading placeholders for future async data — no timers or fetch simulation. */
export function StatGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="surface-panel p-5 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

export function TableRowsSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex gap-4 px-4 py-3 border-b border-border bg-muted/40">
        <Skeleton className="h-4 flex-1 max-w-[120px]" />
        <Skeleton className="h-4 flex-1 max-w-[80px] hidden sm:block" />
        <Skeleton className="h-4 flex-1 max-w-[80px] hidden md:block" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3.5 border-b border-border last:border-0">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16 hidden sm:block" />
          <Skeleton className="h-4 w-20 hidden md:block" />
        </div>
      ))}
    </div>
  );
}
