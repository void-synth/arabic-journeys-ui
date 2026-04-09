import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, teachers, students, adminActivity } from "@/data/mock";
import { Users, GraduationCap, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const upcoming = sessions.filter((s) => s.status === "upcoming");
  const completed = sessions.filter((s) => s.status === "completed");

  return (
    <AdminLayout title="Overview">
      <div className="page-container">
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          Full-directory view: teachers, learners, and every session. Instructors and students only see what belongs to them.
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Teachers" value={teachers.length} icon={GraduationCap} />
          <StatCard title="Learners" value={students.length} icon={Users} />
          <StatCard title="Sessions" value={sessions.length} icon={Calendar} />
          <StatCard title="Completion rate" value="75%" icon={TrendingUp} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-5">Recent sessions</h3>
            <div className="space-y-1">
              {sessions.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.teacherName} · {s.date}
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-5">Activity summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Upcoming sessions</span>
                  <span className="font-semibold text-foreground tabular-nums">{upcoming.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Completed sessions</span>
                  <span className="font-semibold text-foreground tabular-nums">{completed.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Active teachers</span>
                  <span className="font-semibold text-foreground tabular-nums">{teachers.filter((t) => t.status === "active").length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Active students</span>
                  <span className="font-semibold text-foreground tabular-nums">{students.filter((s) => s.status === "active").length}</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">Latest activity</h3>
              <ul className="space-y-3">
                {adminActivity.map((a) => (
                  <li key={a.id} className="flex gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 rounded-full shrink-0",
                        a.tone === "success" && "bg-emerald-500",
                        a.tone === "warning" && "bg-amber-500",
                        a.tone === "neutral" && "bg-muted-foreground/50"
                      )}
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{a.label}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{a.detail}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-1">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
