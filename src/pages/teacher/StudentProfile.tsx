import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { students, sessions, attendance } from "@/data/mock";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";

export default function StudentProfile() {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <TeacherLayout title="Student Not Found">
        <div className="page-container text-center py-20">
          <p className="text-muted-foreground">Student not found.</p>
          <Link to="/teacher/students"><Button variant="outline" className="mt-4">Back</Button></Link>
        </div>
      </TeacherLayout>
    );
  }

  const studentSessions = sessions.filter((s) => s.students.includes(student.id));
  const studentAttendance = attendance.filter((a) => a.studentId === student.id);

  return (
    <TeacherLayout title="Student Profile">
      <div className="page-container">
        <PageHeader title={student.name} actions={
          <div className="flex gap-2">
            <Link to={`/teacher/students/${student.id}/edit`}><Button variant="outline">Edit</Button></Link>
            <Link to="/teacher/students"><Button variant="ghost">Back</Button></Link>
          </div>
        } />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-foreground">{student.name}</p>
                <StatusBadge status={student.status} />
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" />{student.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{student.phone}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />Joined {student.joinedDate}</div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-3">Sessions ({studentSessions.length})</h3>
              <div className="space-y-2">
                {studentSessions.map((s) => (
                  <Link key={s.id} to={`/teacher/sessions/${s.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                    <StatusBadge status={s.status} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-foreground mb-3">Attendance History</h3>
              {studentAttendance.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attendance records.</p>
              ) : (
                <div className="space-y-2">
                  {studentAttendance.map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-foreground">{a.date}</span>
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
