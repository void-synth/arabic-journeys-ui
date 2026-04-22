import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentTeacher, type AttendanceRecord } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ATTENDANCE_UPDATED_EVENT, getAttendanceRecords } from "@/lib/attendanceStore";
import { useStoredSessions } from "@/lib/useStoredSessions";

export default function TeacherAttendance() {
  const [search, setSearch] = useState("");
  const sessions = useStoredSessions();
  const [allAttendanceRows, setAllAttendanceRows] = useState<AttendanceRecord[]>(() => getAttendanceRecords());
  const mySessionIds = useMemo(
    () => new Set(sessions.filter((s) => s.teacherId === currentTeacher.id).map((s) => s.id)),
    [sessions]
  );
  const mine = useMemo(() => allAttendanceRows.filter((a) => mySessionIds.has(a.sessionId)), [allAttendanceRows, mySessionIds]);
  const filtered = mine.filter((a) => a.studentName.toLowerCase().includes(search.toLowerCase()));

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
    <TeacherLayout title="Attendance">
      <div className="page-container">
        <PageHeader
          title="Attendance"
          description="Rows from sessions you teach. Export is a demo — wire to your MIS when backend exists."
          actions={
            <Button variant="outline" type="button">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          }
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by student..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { header: "Student", accessor: "studentName" },
            { header: "Session", accessor: (a) => sessions.find((s) => s.id === a.sessionId)?.title || "—" },
            { header: "Date", accessor: "date", className: "hidden sm:table-cell" },
            { header: "Status", accessor: (a) => <StatusBadge status={a.status} /> },
          ]}
        />
      </div>
    </TeacherLayout>
  );
}
