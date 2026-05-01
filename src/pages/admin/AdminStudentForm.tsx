import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/localStorageJson";
import { upsertStudent } from "@/lib/directoryStore";
import { useStoredStudents } from "@/lib/useStoredDirectory";

/** Admin-only: create or edit learner accounts (teachers see roster read-only). */
export default function AdminStudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const students = useStoredStudents();
  const student = id ? students.find((s) => s.id === id) : null;
  const isEdit = !!student;
  const draftKey = `neoarabi_admin_student_form_${id ?? "new"}`;

  const fallback = {
    name: student?.name ?? "",
    email: student?.email ?? "",
    phone: student?.phone ?? "",
  };
  const stored = readStoredJSON<typeof fallback>(draftKey, fallback);

  const [name, setName] = useState(stored.name);
  const [email, setEmail] = useState(stored.email);
  const [phone, setPhone] = useState(stored.phone);

  function save() {
    void (async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      toast.error("Full name is required.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      toast.error("Enter a valid email.");
      return;
    }
    if (cleanPhone && cleanPhone.length < 7) {
      toast.error("Phone looks too short.");
      return;
    }
    const duplicate = students.find((row) => row.email.toLowerCase() === cleanEmail && row.id !== id);
    if (duplicate) {
      toast.error("Another learner already uses this email.");
      return;
    }
    writeStoredJSON(draftKey, { name: cleanName, email: cleanEmail, phone: cleanPhone });
    await upsertStudent({ id, name: cleanName, email: cleanEmail, phone: cleanPhone });
    toast.success(isEdit ? "Learner updated (frontend local persistence)." : "Learner added (frontend local persistence).");
    navigate("/admin/students");
    })();
  }

  return (
    <AdminLayout title={isEdit ? "Edit learner" : "Add learner"}>
      <div className="page-container max-w-lg">
        <PageHeader
          title={isEdit ? "Edit learner" : "Add learner"}
          description="Demo form — values persist in this browser only; production would enforce enrollment on the server."
        />
        <div className="surface-panel space-y-4 p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="as-name">Full name</Label>
            <Input id="as-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="as-email">Email</Label>
            <Input id="as-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="learner@school.edu" autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="as-phone">Phone</Label>
            <Input id="as-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 …" autoComplete="tel" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={save}>
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
