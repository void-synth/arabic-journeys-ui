import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <div className="page-container max-w-2xl">
        <PageHeader title="Platform Settings" description="Configure platform preferences" />
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h3 className="font-semibold text-foreground">General</h3>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Platform Name</Label><Input defaultValue="ArabicLearn" /></div>
              <div className="space-y-2"><Label>Support Email</Label><Input defaultValue="support@arabiclearn.com" /></div>
              <div className="space-y-2"><Label>Max Students per Session</Label><Input type="number" defaultValue={20} /></div>
            </div>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
