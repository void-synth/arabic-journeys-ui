import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { attendance, sessions } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import { useState } from "react";

export default function TeacherAttendance() {
  const [search, setSearch] = useState("");
  const filtered = attendance.filter(
    (a) => a.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TeacherLayout title="Attendance">
      <div className="page-container">
        <PageHeader
          title="Attendance & Reports"
          description="Track student attendance across sessions"
          actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>}
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
