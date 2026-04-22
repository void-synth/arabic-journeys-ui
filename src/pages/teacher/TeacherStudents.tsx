import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentTeacher } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const sessions = useStoredSessions();
  const students = useStoredStudents();
  const assignments = useTeacherAssignments();
  const roster = useMemo(() => {
    const fromSessions = new Set(
      sessions
        .filter((session) => session.teacherId === currentTeacher.id)
        .flatMap((session) => session.students)
    );
    const fromAssignments = new Set(assignments[currentTeacher.id] ?? []);
    const allowed = new Set([...fromSessions, ...fromAssignments]);
    return students.filter((student) => allowed.has(student.id));
  }, [assignments, sessions, students]);
  const filtered = roster.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TeacherLayout title="My learners">
      <div className="page-container">
        <PageHeader
          title="My learners"
          description="Learners enrolled in at least one of your sessions. Adding or editing accounts is handled under Admin → Learners."
        />
        <div className="mb-4 flex items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search roster…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          onRowClick={(s) => navigate(`/teacher/students/${s.id}`)}
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email", className: "hidden sm:table-cell" },
            { header: "Phone", accessor: (s) => s.phone || "—", className: "hidden md:table-cell" },
            { header: "Joined", accessor: "joinedDate", className: "hidden lg:table-cell" },
            { header: "Status", accessor: (s) => <StatusBadge status={s.status} /> },
          ]}
        />
      </div>
    </TeacherLayout>
  );
}
