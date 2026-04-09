import { TeacherLayout } from "@/layouts/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, currentTeacher, getStudentsForTeacher } from "@/data/mock";
import { Users, Calendar, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
  const mySessions = sessions.filter((s) => s.teacherId === currentTeacher.id);
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const rosterCount = getStudentsForTeacher(currentTeacher.id).length;

  return (
    <TeacherLayout title="Dashboard">
      <div className="page-container">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Your sessions" value={mySessions.length} icon={Calendar} />
          <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
          <StatCard title="Completed" value={completed.length} icon={BookOpen} />
          <StatCard title="Learners on roster" value={rosterCount} icon={Users} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-foreground">Upcoming sessions</h3>
              <Link to="/teacher/sessions">
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </div>
            <div className="space-y-1">
              {upcoming.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No upcoming sessions</p>}
              {upcoming.map((s) => (
                <Link
                  key={s.id}
                  to={`/teacher/sessions/${s.id}`}
                  className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-muted/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {s.date} · {s.time} · {s.duration} min
                    </p>
                  </div>
                  <StatusBadge status={s.status} />
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">Quick actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/teacher/sessions/create">
                <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">New session</span>
                </Button>
              </Link>
              <Link to="/teacher/students">
                <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">My learners</span>
                </Button>
              </Link>
              <Link to="/teacher/attendance">
                <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Attendance</span>
                </Button>
              </Link>
              <Link to="/teacher/notifications">
                <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Alerts</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
