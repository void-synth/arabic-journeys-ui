import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { students } from "@/data/mock";

/** Admin-only: create or edit learner accounts (teachers see roster read-only). */
export default function AdminStudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = id ? students.find((s) => s.id === id) : null;
  const isEdit = !!student;

  return (
    <AdminLayout title={isEdit ? "Edit learner" : "Add learner"}>
      <div className="page-container max-w-lg">
        <PageHeader
          title={isEdit ? "Edit learner" : "Add learner"}
          description="Demo form only — in production, enrollment and roles would be enforced on the server."
        />
        <div className="surface-panel space-y-4 p-6 sm:p-8">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input defaultValue={student?.name ?? ""} placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={student?.email ?? ""} placeholder="learner@school.edu" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={student?.phone ?? ""} placeholder="+1 …" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={() => navigate("/admin/students")}>
              {isEdit ? "Save" : "Add learner"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/students")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
