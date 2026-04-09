import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentStudent } from "@/data/mock";

export default function StudentSettings() {
  return (
    <StudentLayout title="Settings">
      <div className="page-container max-w-2xl">
        <PageHeader title="Settings" description="Manage your profile" />
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Profile</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input defaultValue={currentStudent.name} /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue={currentStudent.email} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue={currentStudent.phone} /></div>
            </div>
            <Button>Save</Button>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Change Password</h3>
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
            </div>
            <Button>Update Password</Button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
