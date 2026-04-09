import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { students } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <TeacherLayout title="Students">
      <div className="page-container">
        <PageHeader
          title="Student Management"
          description="View and manage your students"
          actions={<Link to="/teacher/students/add"><Button><Plus className="h-4 w-4 mr-2" />Add Student</Button></Link>}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
            {
              header: "Actions",
              accessor: (s) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/teacher/students/${s.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
                </div>
              ),
            },
          ]}
        />
      </div>
    </TeacherLayout>
  );
}
