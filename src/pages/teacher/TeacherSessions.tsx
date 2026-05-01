import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { deleteSession } from "@/lib/sessionStore";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/lib/auth";

export default function TeacherSessions() {
  const auth = useAuth();
  const teacherId = auth.userId;
  const navigate = useNavigate();
  const sessions = useStoredSessions();
  const mySessions = sessions.filter((s) => teacherId && s.teacherId === teacherId);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const filtered = mySessions.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <TeacherLayout title="Sessions">
      <div className="page-container">
        <PageHeader
          title="Session Management"
          description="Create and manage your teaching sessions"
          actions={
            <Link to="/teacher/sessions/create">
              <Button><Plus className="h-4 w-4 mr-2" />Create Session</Button>
            </Link>
          }
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sessions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <DataTable
          data={filtered}
          onRowClick={(s) => navigate(`/teacher/sessions/${s.id}`)}
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Subject", accessor: "subject", className: "hidden sm:table-cell" },
            { header: "Date", accessor: "date", className: "hidden md:table-cell" },
            { header: "Time", accessor: "time", className: "hidden md:table-cell" },
            { header: "Students", accessor: (s) => s.students.length },
            { header: "Status", accessor: (s) => <StatusBadge status={s.status} /> },
            {
              header: "Actions",
              accessor: (s) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/teacher/sessions/${s.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteModal(s.id)}>Delete</Button>
                </div>
              ),
            },
          ]}
        />
        <ConfirmModal
          open={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={async () => {
            if (!deleteModal) return;
            const ok = await deleteSession(deleteModal);
            setDeleteModal(null);
            if (ok) toast.success("Session deleted.");
          }}
          title="Delete Session"
          description="Are you sure you want to delete this session? This action cannot be undone."
          confirmText="Delete"
          destructive
        />
      </div>
    </TeacherLayout>
  );
}
