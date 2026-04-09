import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, teachers, students } from "@/data/mock";
import { Users, GraduationCap, Calendar, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const upcoming = sessions.filter((s) => s.status === "upcoming");
  const completed = sessions.filter((s) => s.status === "completed");

  return (
    <AdminLayout title="Dashboard">
      <div className="page-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Teachers" value={teachers.length} icon={GraduationCap} trend="1 new" trendUp />
          <StatCard title="Students" value={students.length} icon={Users} trend="3 new" trendUp />
          <StatCard title="Total Sessions" value={sessions.length} icon={Calendar} />
          <StatCard title="Completion Rate" value="75%" icon={TrendingUp} trend="5% up" trendUp />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Recent Sessions</h3>
            <div className="space-y-2">
              {sessions.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.teacherName} · {s.date}</p>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Activity Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Upcoming sessions</span><span className="font-semibold text-foreground">{upcoming.length}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Completed sessions</span><span className="font-semibold text-foreground">{completed.length}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Active teachers</span><span className="font-semibold text-foreground">{teachers.filter((t) => t.status === "active").length}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Active students</span><span className="font-semibold text-foreground">{students.filter((s) => s.status === "active").length}</span></div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
