import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStoredStudents, useStoredTeachers } from "@/lib/useStoredDirectory";
import { toggleStudentStatus } from "@/lib/directoryStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  assignStudentsToTeacher,
  getAssignedTeacherIdsForStudent,
  setStudentTeacherAssignments,
} from "@/lib/teacherAssignmentStore";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";
import { toast } from "@/components/ui/sonner";

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const students = useStoredStudents();
  const teachers = useStoredTeachers();
  const assignments = useTeacherAssignments();
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [bulkTeacherId, setBulkTeacherId] = useState("");
  const [assignModalStudentId, setAssignModalStudentId] = useState<string | null>(null);
  const [editingTeacherIds, setEditingTeacherIds] = useState<string[]>([]);
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const assignModalStudent = assignModalStudentId ? students.find((row) => row.id === assignModalStudentId) ?? null : null;
  const assignedTeacherLabels = useMemo(() => {
    const names = new Map(teachers.map((teacher) => [teacher.id, teacher.name]));
    return students.reduce<Record<string, string>>((acc, student) => {
      const teacherIds = getAssignedTeacherIdsForStudent(student.id);
      acc[student.id] = teacherIds.length > 0 ? teacherIds.map((teacherId) => names.get(teacherId) ?? "Unknown").join(", ") : "Unassigned";
      return acc;
    }, {});
  }, [students, teachers, assignments]);

  function toggleStudentSelection(studentId: string) {
    setSelectedStudentIds((prev) => (prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]));
  }

  function openAssignModal(studentId: string) {
    setAssignModalStudentId(studentId);
    setEditingTeacherIds(getAssignedTeacherIdsForStudent(studentId));
  }

  function toggleTeacherInModal(teacherId: string) {
    setEditingTeacherIds((prev) => (prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId]));
  }

  function saveStudentAssignments() {
    if (!assignModalStudentId) return;
    setStudentTeacherAssignments(assignModalStudentId, editingTeacherIds);
    toast.success("Teacher assignment updated.");
    setAssignModalStudentId(null);
  }

  function applyBulkAssign() {
    if (!bulkTeacherId) {
      toast.error("Select a teacher for bulk assignment.");
      return;
    }
    if (selectedStudentIds.length === 0) {
      toast.error("Select at least one learner.");
      return;
    }
    assignStudentsToTeacher(selectedStudentIds, bulkTeacherId);
    toast.success(`Assigned ${selectedStudentIds.length} learner(s) to the selected teacher.`);
    setSelectedStudentIds([]);
  }

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
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
          <p className="text-xs font-medium text-muted-foreground">Bulk assign:</p>
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            value={bulkTeacherId}
            onChange={(e) => setBulkTeacherId(e.target.value)}
          >
            <option value="">Select teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          <Button type="button" variant="outline" size="sm" onClick={applyBulkAssign}>
            Apply to selected ({selectedStudentIds.length})
          </Button>
        </div>
        <DataTable
          data={filtered}
          columns={[
            {
              header: "",
              accessor: (s) => (
                <input
                  type="checkbox"
                  checked={selectedStudentIds.includes(s.id)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleStudentSelection(s.id)}
                />
              ),
            },
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email", className: "hidden sm:table-cell" },
            { header: "Joined", accessor: "joinedDate", className: "hidden md:table-cell" },
            { header: "Assigned teacher(s)", accessor: (s) => assignedTeacherLabels[s.id], className: "hidden lg:table-cell" },
            { header: "Status", accessor: (s) => <StatusBadge status={s.status} /> },
            {
              header: "Actions",
              accessor: (s) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Link to={`/admin/students/${s.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => toggleStudentStatus(s.id)}>
                    {s.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openAssignModal(s.id)}>
                    Assign
                  </Button>
                </div>
              ),
            },
          ]}
        />
        <Dialog open={!!assignModalStudent} onOpenChange={(open) => (!open ? setAssignModalStudentId(null) : null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign teachers</DialogTitle>
              <DialogDescription>
                Choose which teachers can manage {assignModalStudent?.name ?? "this learner"}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              {teachers.map((teacher) => (
                <label key={teacher.id} className="flex items-center gap-2 rounded-lg border border-border p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editingTeacherIds.includes(teacher.id)}
                    onChange={() => toggleTeacherInModal(teacher.id)}
                  />
                  <span>{teacher.name}</span>
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAssignModalStudentId(null)}>
                Cancel
              </Button>
              <Button type="button" onClick={saveStudentAssignments}>
                Save assignments
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
