import { StudentLayout } from "@/layouts/StudentLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, currentStudent } from "@/data/mock";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const mySessions = sessions.filter((s) => s.students.includes(currentStudent.id));
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");

  return (
    <StudentLayout title="Dashboard">
      <div className="page-container">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Sessions" value={mySessions.length} icon={Calendar} />
          <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
          <StatCard title="Completed" value={completed.length} icon={BookOpen} />
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
            <Link to="/student/sessions"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-3">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No upcoming sessions</p>}
            {upcoming.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Link to={`/student/sessions/${s.id}`} className="flex-1">
                  <p className="font-medium text-foreground text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.teacherName} · {s.date} · {s.time}</p>
                </Link>
                <div className="flex items-center gap-2">
                  <StatusBadge status={s.status} />
                  {s.meetingLink && (
                    <a href={s.meetingLink} target="_blank" rel="noreferrer">
                      <Button size="sm">Join</Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
