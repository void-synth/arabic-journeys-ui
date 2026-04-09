import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { students } from "@/data/mock";

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = id ? students.find((s) => s.id === id) : null;
  const isEdit = !!student;

  return (
    <TeacherLayout title={isEdit ? "Edit Student" : "Add Student"}>
      <div className="page-container max-w-lg">
        <PageHeader title={isEdit ? "Edit Student" : "Add New Student"} />
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={student?.name || ""} placeholder="Student name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={student?.email || ""} placeholder="student@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={student?.phone || ""} placeholder="+1234567890" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={() => navigate("/teacher/students")}>{isEdit ? "Update" : "Add Student"}</Button>
            <Button variant="outline" onClick={() => navigate("/teacher/students")}>Cancel</Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
