import { TeacherLayout } from "@/layouts/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, students, currentTeacher } from "@/data/mock";
import { Users, Calendar, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
  const mySessions = sessions.filter((s) => s.teacherId === currentTeacher.id);
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");

  return (
    <TeacherLayout title="Dashboard">
      <div className="page-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Sessions" value={mySessions.length} icon={Calendar} trend="12% this month" trendUp />
          <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
          <StatCard title="Completed" value={completed.length} icon={BookOpen} />
          <StatCard title="Students" value={students.length} icon={Users} trend="2 new" trendUp />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
              <Link to="/teacher/sessions"><Button variant="ghost" size="sm">View all</Button></Link>
            </div>
            <div className="space-y-3">
              {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No upcoming sessions</p>}
              {upcoming.map((s) => (
                <Link key={s.id} to={`/teacher/sessions/${s.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.date} · {s.time} · {s.duration}min</p>
                  </div>
                  <StatusBadge status={s.status} />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/teacher/sessions/create">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-xs">New Session</span>
                </Button>
              </Link>
              <Link to="/teacher/students/add">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-xs">Add Student</span>
                </Button>
              </Link>
              <Link to="/teacher/attendance">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-xs">Attendance</span>
                </Button>
              </Link>
              <Link to="/teacher/notifications">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-xs">Notifications</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
