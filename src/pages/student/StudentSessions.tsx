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
        <PageHeader title="Session History" description="Past and upcoming sessions tied to your mock enrollment." />
        <div className="space-y-3">
          {mySessions.map((s) => (
            <Link
              key={s.id}
              to={`/student/sessions/${s.id}`}
              className="surface-panel p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/25 transition-colors block"
            >
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {s.teacherName} · {s.date} · {s.time} · {s.duration} min
                </p>
              </div>
              <StatusBadge status={s.status} />
            </Link>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
