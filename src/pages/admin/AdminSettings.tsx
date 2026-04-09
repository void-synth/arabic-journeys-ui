import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatGridSkeleton, TableRowsSkeleton } from "@/components/shared/LoadingSkeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <div className="page-container max-w-3xl">
        <PageHeader title="Platform Settings" description="Configuration UI only — values are not persisted." />
        <div className="space-y-10">
          <div className="surface-panel p-6 sm:p-8 space-y-5">
            <h3 className="font-display font-semibold text-lg text-foreground">General</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Platform name</Label>
                <Input defaultValue="ArabicLearn" />
              </div>
              <div className="space-y-2">
                <Label>Support email</Label>
                <Input defaultValue="support@arabiclearn.com" />
              </div>
              <div className="space-y-2">
                <Label>Max students per session</Label>
                <Input type="number" defaultValue={20} />
              </div>
            </div>
            <Button type="button">Save</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground font-display mb-3">Loading placeholders (visual only)</h3>
            <p className="text-xs text-muted-foreground mb-4 max-w-xl">
              Reusable skeleton blocks for dashboards and tables — static preview, no simulated loading.
            </p>
            <div className="space-y-6">
              <StatGridSkeleton />
              <TableRowsSkeleton />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
