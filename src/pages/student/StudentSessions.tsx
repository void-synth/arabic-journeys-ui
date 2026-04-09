import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, currentStudent } from "@/data/mock";
import { Link } from "react-router-dom";

export default function StudentSessions() {
  const mySessions = sessions.filter((s) => s.students.includes(currentStudent.id));

  return (
    <StudentLayout title="Session History">
      <div className="page-container">
        <PageHeader title="Session History" description="View all your past and upcoming sessions" />
        <div className="space-y-2">
          {mySessions.map((s) => (
            <Link key={s.id} to={`/student/sessions/${s.id}`} className="bg-card rounded-lg border border-border p-4 flex items-center justify-between hover:bg-muted/30 transition-colors block">
              <div>
                <p className="font-medium text-foreground text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.teacherName} · {s.date} · {s.time} · {s.duration}min</p>
              </div>
              <StatusBadge status={s.status} />
            </Link>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
