import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-xl border border-dashed border-border/80 bg-muted/20">
      <div className="h-16 w-16 rounded-2xl bg-card shadow-sm ring-1 ring-border/60 flex items-center justify-center mb-5">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground font-display">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">{description}</p>
    </div>
  );
}
