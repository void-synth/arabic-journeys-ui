import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { sessions, students } from "@/data/mock";

export default function SessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = id ? sessions.find((s) => s.id === id) : null;
  const isEdit = !!session;

  return (
    <TeacherLayout title={isEdit ? "Edit Session" : "Create Session"}>
      <div className="page-container max-w-2xl">
        <PageHeader title={isEdit ? "Edit Session" : "Create New Session"} description={isEdit ? "Update session details" : "Fill in the details for your new session"} />
        <div className="surface-panel p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input defaultValue={session?.title || ""} placeholder="Session title" />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input defaultValue={session?.subject || ""} placeholder="e.g. Arabic 101" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" defaultValue={session?.date || ""} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue={session?.time || ""} />
            </div>
            <div className="space-y-2">
              <Label>Duration (min)</Label>
              <Input type="number" defaultValue={session?.duration || 60} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Meeting Link</Label>
            <Input defaultValue={session?.meetingLink || ""} placeholder="https://meet.example.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea defaultValue={session?.description || ""} placeholder="Session description..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Students</Label>
            <div className="grid grid-cols-2 gap-2">
              {students.map((s) => (
                <label key={s.id} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted/50 cursor-pointer text-sm">
                  <input type="checkbox" defaultChecked={session?.students.includes(s.id)} className="rounded border-border text-primary" />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={() => navigate("/teacher/sessions")}>{isEdit ? "Update Session" : "Create Session"}</Button>
            <Button variant="outline" onClick={() => navigate("/teacher/sessions")}>Cancel</Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
