import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { students } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Students">
      <div className="page-container">
        <PageHeader title="Manage Students" description="View all students on the platform" />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email", className: "hidden sm:table-cell" },
            { header: "Joined", accessor: "joinedDate", className: "hidden md:table-cell" },
            { header: "Status", accessor: (s) => <StatusBadge status={s.status} /> },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
