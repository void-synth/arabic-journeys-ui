import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function AdminSessions() {
  const [search, setSearch] = useState("");
  const filtered = sessions.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Sessions">
      <div className="page-container">
        <PageHeader title="All Sessions" description="Platform-wide session overview" />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sessions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Teacher", accessor: "teacherName", className: "hidden sm:table-cell" },
            { header: "Date", accessor: "date", className: "hidden md:table-cell" },
            { header: "Students", accessor: (s) => s.students.length },
            { header: "Status", accessor: (s) => <StatusBadge status={s.status} /> },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
