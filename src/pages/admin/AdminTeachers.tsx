import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useStoredTeachers } from "@/lib/useStoredDirectory";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleTeacherStatus } from "@/lib/directoryStore";

export default function AdminTeachers() {
  const [search, setSearch] = useState("");
  const teachers = useStoredTeachers();
  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Teachers">
      <div className="page-container">
        <PageHeader title="Manage Teachers" description="View all teachers on the platform" />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email", className: "hidden sm:table-cell" },
            { header: "Phone", accessor: (t) => t.phone || "—", className: "hidden md:table-cell" },
            { header: "Joined", accessor: "joinedDate", className: "hidden lg:table-cell" },
            { header: "Status", accessor: (t) => <StatusBadge status={t.status} /> },
            {
              header: "Actions",
              accessor: (t) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" onClick={() => toggleTeacherStatus(t.id)}>
                    {t.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
