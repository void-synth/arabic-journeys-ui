import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Profile = { name: string; email: string; phone: string };

const MAX_SNAPSHOT_SIZE_MB = 2;
const SNAPSHOT_BUCKET = "profile-snapshots";

export default function TeacherSettings() {
  const auth = useAuth();
  const base: Profile = {
    name: auth.userName || "",
    email: "",
    phone: "",
  };
  const [name, setName] = useState(base.name);
  const [email, setEmail] = useState(base.email);
  const [phone, setPhone] = useState(base.phone);
  const [snapshotUrl, setSnapshotUrl] = useState("");
  const [snapshotFile, setSnapshotFile] = useState<File | null>(null);
  const [snapshotPreview, setSnapshotPreview] = useState("");
  const [removeSnapshot, setRemoveSnapshot] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    if (!supabase || !auth.userId) return;
    void (async () => {
      const { data } = await supabase.from("profiles").select("full_name,email,phone,avatar_url").eq("id", auth.userId).maybeSingle();
      if (!data) return;
      setName(data.full_name ?? "");
      setEmail(data.email ?? "");
      setPhone(data.phone ?? "");
      setSnapshotUrl(data.avatar_url ?? "");
      setSnapshotPreview(data.avatar_url ?? "");
    })();
  }, [auth.userId]);

  async function saveProfile() {
    if (!supabase || !auth.userId) {
      toast.error("Supabase auth session required.");
      return;
    }
    let avatarUrlToSave: string | null = snapshotUrl || null;
    if (removeSnapshot) {
      avatarUrlToSave = null;
    } else if (snapshotFile) {
      const ext = snapshotFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeExt = ext === "png" || ext === "webp" || ext === "jpg" || ext === "jpeg" ? ext : "jpg";
      const path = `${auth.userId}/avatar.${safeExt}`;
      const upload = await supabase.storage.from(SNAPSHOT_BUCKET).upload(path, snapshotFile, { upsert: true });
      if (upload.error) {
        toast.error(upload.error.message);
        return;
      }
      const { data } = supabase.storage.from(SNAPSHOT_BUCKET).getPublicUrl(path);
      avatarUrlToSave = data.publicUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name.trim(), phone: phone.trim() || null, avatar_url: avatarUrlToSave })
      .eq("id", auth.userId);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSnapshotUrl(avatarUrlToSave ?? "");
    setSnapshotPreview(avatarUrlToSave ?? "");
    setSnapshotFile(null);
    setRemoveSnapshot(false);
    await auth.refreshSession();
    toast.success("Profile updated.");
  }

  async function onSnapshotSelected(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    const maxBytes = MAX_SNAPSHOT_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Image is too large. Max ${MAX_SNAPSHOT_SIZE_MB}MB.`);
      return;
    }
    const preview = URL.createObjectURL(file);
    setSnapshotFile(file);
    setSnapshotPreview(preview);
    setRemoveSnapshot(false);
  }

  async function updatePassword() {
    if (!newPw || !confirmPw) {
      toast.error("Fill in new password and confirmation.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  }

  async function connectGoogleCalendar() {
    if (!supabase) {
      toast.error("Supabase is not configured in this running app. Restart the dev server after updating env vars.");
      return;
    }
    let uid = auth.userId;
    if (!uid) {
      await auth.refreshSession();
      uid = auth.userId;
    }
    if (!uid) {
      const userResult = await supabase.auth.getUser();
      uid = userResult.data.user?.id ?? null;
    }
    if (!uid) {
      toast.error("No active Supabase session found. Log out and sign in with your real account, then try again.");
      return;
    }

    const { data, error } = await supabase.functions.invoke("google-oauth-start", {
      body: { callbackPath: "/teacher/settings" },
    });
    if (error || !data?.authUrl) {
      toast.error(error?.message ?? "Could not start Google OAuth flow.");
      return;
    }
    window.location.href = String(data.authUrl);
  }

  return (
    <TeacherLayout title="Settings">
      <div className="page-container max-w-2xl">
        <PageHeader title="Settings" description="Manage your profile and connected services." />
        <div className="space-y-6">
          <div className="surface-panel p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Profile information</h3>
            <div className="flex items-center gap-4 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.62)] p-4">
              <Avatar className="h-16 w-16 ring-1 ring-[hsl(160_25%_28%/0.14)]">
                <AvatarImage src={snapshotPreview} alt={name || "Teacher snapshot"} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {(name || "T")
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? "")
                    .join("") || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="tc-snapshot">Snapshot</Label>
                <Input
                  id="tc-snapshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => void onSnapshotSelected(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">JPG, PNG, or WEBP up to 2MB.</p>
              </div>
              {snapshotPreview ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSnapshotFile(null);
                    setSnapshotPreview("");
                    setRemoveSnapshot(true);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tc-name">Name</Label>
                <Input id="tc-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tc-email">Email</Label>
                <Input id="tc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tc-phone">Phone</Label>
                <Input id="tc-phone" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </div>
            </div>
            <Button type="button" onClick={saveProfile}>
              Save Changes
            </Button>
          </div>
          <div className="surface-panel p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Change password</h3>
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="tc-cur">Current Password</Label>
                <Input id="tc-cur" type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} autoComplete="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tc-new">New Password</Label>
                <Input id="tc-new" type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tc-conf">Confirm Password</Label>
                <Input id="tc-conf" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} autoComplete="new-password" />
              </div>
            </div>
            <Button type="button" onClick={updatePassword}>
              Update Password
            </Button>
          </div>
          <div className="surface-panel p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Google integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect Google Calendar to auto-create Meet links for your sessions.
            </p>
            <Button type="button" variant="outline" onClick={() => void connectGoogleCalendar()}>
              Connect Google Calendar
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
