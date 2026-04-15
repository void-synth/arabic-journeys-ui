import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatGridSkeleton, TableRowsSkeleton } from "@/components/shared/LoadingSkeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/localStorageJson";

const PLATFORM_KEY = "neoarabi_settings_admin_platform";

type Platform = { platformName: string; supportEmail: string; maxStudentsPerSession: string };

export default function AdminSettings() {
  const defaults: Platform = {
    platformName: "ArabicLearn",
    supportEmail: "support@arabiclearn.com",
    maxStudentsPerSession: "20",
  };
  const stored = readStoredJSON<Platform>(PLATFORM_KEY, defaults);

  const [platformName, setPlatformName] = useState(stored.platformName);
  const [supportEmail, setSupportEmail] = useState(stored.supportEmail);
  const [maxStudentsPerSession, setMaxStudentsPerSession] = useState(stored.maxStudentsPerSession);

  function save() {
    const cleanName = platformName.trim();
    const cleanEmail = supportEmail.trim().toLowerCase();
    const max = Number(maxStudentsPerSession);
    if (!cleanName) {
      toast.error("Platform name is required.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      toast.error("Support email must be valid.");
      return;
    }
    if (!Number.isFinite(max) || max < 1 || max > 200) {
      toast.error("Max students per session must be between 1 and 200.");
      return;
    }
    writeStoredJSON(PLATFORM_KEY, {
      platformName: cleanName,
      supportEmail: cleanEmail,
      maxStudentsPerSession: String(max),
    });
    toast.success("Settings saved in this browser only.");
  }

  function resetAllFrontendData() {
    const ok = window.confirm("Reset all frontend demo data? This will clear sessions, directory, notifications, assignments, and settings.");
    if (!ok) return;
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("neoarabi_"));
    for (const key of keys) localStorage.removeItem(key);
    sessionStorage.removeItem("dev_gate_unlocked");
    toast.success("Frontend demo data reset. Reloading...");
    window.setTimeout(() => window.location.reload(), 450);
  }

  return (
    <AdminLayout title="Settings">
      <div className="page-container max-w-3xl">
        <PageHeader title="Platform Settings" description="Demo UI — values persist in this browser only until you clear site data." />
        <div className="space-y-10">
          <div className="surface-panel p-6 sm:p-8 space-y-5">
            <h3 className="font-display font-semibold text-lg text-foreground">General</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adm-name">Platform name</Label>
                <Input id="adm-name" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adm-email">Support email</Label>
                <Input id="adm-email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adm-max">Max students per session</Label>
                <Input
                  id="adm-max"
                  type="number"
                  min={1}
                  value={maxStudentsPerSession}
                  onChange={(e) => setMaxStudentsPerSession(e.target.value)}
                />
              </div>
            </div>
            <Button type="button" onClick={save}>
              Save
            </Button>
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

          <div className="surface-panel border-destructive/25 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">Ultimate admin power</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Force-reset all frontend data in this browser. Useful when demo state becomes inconsistent.
            </p>
            <Button type="button" variant="destructive" className="mt-4" onClick={resetAllFrontendData}>
              Reset all demo data
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
