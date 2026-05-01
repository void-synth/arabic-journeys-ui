import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { type AttendanceRecord } from "@/data/mock";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Link as LinkIcon, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { ATTENDANCE_UPDATED_EVENT, getAttendanceRecords, loadAttendanceRecords, upsertSessionAttendance, type AttendanceStatus } from "@/lib/attendanceStore";
import { toast } from "@/components/ui/sonner";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useAuth } from "@/lib/auth";
import { logEvent } from "@/lib/analytics";

export default function SessionDetail() {
  const auth = useAuth();
  const teacherId = auth.userId;
  const { id } = useParams();
  const sessions = useStoredSessions();
  const allStudents = useStoredStudents();
  const session = sessions.find((s) => s.id === id);
  const isOwner = session ? session.teacherId === teacherId : false;

  const sessionStudents = useMemo(
    () => (session ? allStudents.filter((s) => session.students.includes(s.id)) : []),
    [allStudents, session]
  );

  const [allAttendanceRows, setAllAttendanceRows] = useState<AttendanceRecord[]>(() => getAttendanceRecords());
  useEffect(() => {
    function refreshRows() {
      void loadAttendanceRecords().then(setAllAttendanceRows);
    }
    void loadAttendanceRecords().then(setAllAttendanceRows);
    window.addEventListener(ATTENDANCE_UPDATED_EVENT, refreshRows);
    return () => {
      window.removeEventListener(ATTENDANCE_UPDATED_EVENT, refreshRows);
    };
  }, []);

  const sessionAttendance = useMemo(
    () => (session ? allAttendanceRows.filter((a) => a.sessionId === session.id) : []),
    [allAttendanceRows, session]
  );
  const [attendanceByStudent, setAttendanceByStudent] = useState<Record<string, AttendanceStatus>>({});

  useEffect(() => {
    if (!session) return;
    const initialMap: Record<string, AttendanceStatus> = {};
    for (const student of sessionStudents) {
      const existing = sessionAttendance.find((row) => row.studentId === student.id);
      initialMap[student.id] = existing?.status ?? "present";
    }
    setAttendanceByStudent(initialMap);
  }, [session, sessionAttendance, sessionStudents]);

  useEffect(() => {
    if (!session?.id || !isOwner) return;
    logEvent("session_detail_opened", { sessionId: session.id, surface: "teacher_detail" });
  }, [session?.id, isOwner]);

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

  if (!isOwner) {
    return (
      <TeacherLayout title="Access Restricted">
        <div className="page-container text-center py-20">
          <p className="text-muted-foreground">You can only view sessions assigned to your teaching profile.</p>
          <Link to="/teacher/sessions">
            <Button variant="outline" className="mt-4">
              Back to sessions
            </Button>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  function handleAttendanceChange(studentId: string, status: AttendanceStatus) {
    setAttendanceByStudent((prev) => ({ ...prev, [studentId]: status }));
  }

  function handleSaveAttendance() {
    if (sessionStudents.length === 0) {
      toast.error("Add students to this session before recording attendance.");
      return;
    }
    const rows = sessionStudents.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      status: attendanceByStudent[student.id] ?? "present",
    }));
    upsertSessionAttendance({
      sessionId: session.id,
      sessionDate: session.date,
      rows,
    });
    void loadAttendanceRecords().then(setAllAttendanceRows);
    toast.success("Attendance saved for this session.");
  }

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
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-foreground">Attendance</h3>
                <Button onClick={handleSaveAttendance}>Save attendance</Button>
              </div>
              {sessionAttendance.length === 0 ? (
                <p className="mb-4 text-sm text-muted-foreground">No saved attendance yet. Mark statuses below and save.</p>
              ) : (
                <div className="mb-4 space-y-2">
                  {sessionAttendance.map((row) => (
                    <div key={row.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                      <span className="text-sm text-foreground">{row.studentName}</span>
                      <StatusBadge status={row.status} />
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-3">
                {sessionStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                    <span className="text-sm font-medium text-foreground">{student.name}</span>
                    <Select
                      value={attendanceByStudent[student.id] ?? "present"}
                      onValueChange={(value) => handleAttendanceChange(student.id, value as AttendanceStatus)}
                    >
                      <SelectTrigger className="h-9 w-[150px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
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
