import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { students } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Learners">
      <div className="page-container">
        <PageHeader
          title="Learners"
          description="Directory-wide list — teachers only see learners enrolled in their own sessions."
          actions={
            <Link to="/admin/students/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add learner
              </Button>
            </Link>
          }
        />
        <div className="mb-4 flex items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search learners…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
