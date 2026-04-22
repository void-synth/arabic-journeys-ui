import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentTeacher, type AttendanceRecord } from "@/data/mock";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ATTENDANCE_UPDATED_EVENT, getAttendanceRecords } from "@/lib/attendanceStore";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";

export default function StudentProfile() {
  const { id } = useParams();
  const students = useStoredStudents();
  const student = students.find((s) => s.id === id);
  const sessions = useStoredSessions();
  const assignments = useTeacherAssignments();
  const [allAttendanceRows, setAllAttendanceRows] = useState<AttendanceRecord[]>(() => getAttendanceRecords());

  const mySessionIds = useMemo(
    () => new Set(sessions.filter((s) => s.teacherId === currentTeacher.id).map((s) => s.id)),
    [sessions]
  );

  if (!student) {
    return (
      <TeacherLayout title="Learner not found">
        <div className="page-container py-20 text-center">
          <p className="text-muted-foreground">No learner matches that link.</p>
          <Link to="/teacher/students">
            <Button variant="outline" className="mt-4">
              Back to roster
            </Button>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  const isOnTeacherRoster =
    sessions.some((session) => session.teacherId === currentTeacher.id && session.students.includes(student.id)) ||
    (assignments[currentTeacher.id] ?? []).includes(student.id);
  if (!isOnTeacherRoster) {
    return (
      <TeacherLayout title="Access restricted">
        <div className="page-container max-w-md py-20 text-center">
          <p className="text-muted-foreground">
            You can open profiles only for learners enrolled in your sessions. This account isn&apos;t on your roster.
          </p>
          <Link to="/teacher/students">
            <Button variant="outline" className="mt-4">
              Back to roster
            </Button>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  const studentSessions = sessions.filter((s) => s.students.includes(student.id) && s.teacherId === currentTeacher.id);
  const studentAttendanceFiltered = allAttendanceRows.filter((a) => a.studentId === student.id && mySessionIds.has(a.sessionId));

  useEffect(() => {
    function refreshRows() {
      setAllAttendanceRows(getAttendanceRecords());
    }
    window.addEventListener(ATTENDANCE_UPDATED_EVENT, refreshRows);
    window.addEventListener("storage", refreshRows);
    return () => {
      window.removeEventListener(ATTENDANCE_UPDATED_EVENT, refreshRows);
      window.removeEventListener("storage", refreshRows);
    };
  }, []);

  return (
    <TeacherLayout title="Learner profile">
      <div className="page-container">
        <PageHeader
          title={student.name}
          description="View-only — roster updates are done by an administrator."
          actions={
            <Link to="/teacher/students">
              <Button variant="ghost">Back</Button>
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-foreground">{student.name}</p>
                <StatusBadge status={student.status} />
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {student.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {student.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Joined {student.joinedDate}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
              <h3 className="mb-3 font-display text-lg font-semibold text-foreground">Your sessions ({studentSessions.length})</h3>
              <div className="space-y-2">
                {studentSessions.map((s) => (
                  <Link
                    key={s.id}
                    to={`/teacher/sessions/${s.id}`}
                    className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                    <StatusBadge status={s.status} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5 md:p-6">
              <h3 className="mb-3 font-display text-lg font-semibold text-foreground">Attendance history</h3>
              {studentAttendanceFiltered.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attendance rows for your sessions yet.</p>
              ) : (
                <div className="space-y-2">
                  {studentAttendanceFiltered.map((a) => (
                    <div key={a.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
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
