import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, students as allStudents, attendance } from "@/data/mock";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Link as LinkIcon, Users } from "lucide-react";

export default function SessionDetail() {
  const { id } = useParams();
  const session = sessions.find((s) => s.id === id);

  if (!session) {
    return (
      <TeacherLayout title="Session Not Found">
        <div className="page-container text-center py-20">
          <p className="text-muted-foreground">Session not found.</p>
          <Link to="/teacher/sessions"><Button variant="outline" className="mt-4">Back to Sessions</Button></Link>
        </div>
      </TeacherLayout>
    );
  }

  const sessionStudents = allStudents.filter((s) => session.students.includes(s.id));
  const sessionAttendance = attendance.filter((a) => a.sessionId === session.id);

  return (
    <TeacherLayout title="Session Detail">
      <div className="page-container">
        <PageHeader
          title={session.title}
          actions={
            <div className="flex gap-2">
              <Link to={`/teacher/sessions/${session.id}/edit`}><Button variant="outline">Edit</Button></Link>
              <Link to="/teacher/sessions"><Button variant="ghost">Back</Button></Link>
            </div>
          }
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{session.date}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{session.time} · {session.duration}min</div>
                <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" />{session.students.length} students</div>
                <StatusBadge status={session.status} />
              </div>
              <p className="text-muted-foreground mt-4 text-sm">{session.description}</p>
              {session.meetingLink && (
                <div className="mt-4 flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-primary" />
                  <a href={session.meetingLink} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{session.meetingLink}</a>
                </div>
              )}
            </div>

            {/* Attendance */}
            <div className="surface-panel p-5 md:p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">Attendance</h3>
              {sessionAttendance.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attendance records yet.</p>
              ) : (
                <div className="space-y-2">
                  {sessionAttendance.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-foreground">{a.studentName}</span>
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6 h-fit">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Enrolled students</h3>
            <div className="space-y-2">
              {sessionStudents.map((s) => (
                <Link key={s.id} to={`/teacher/students/${s.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
