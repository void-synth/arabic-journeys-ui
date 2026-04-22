import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentTeacher } from "@/data/mock";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/localStorageJson";

const PROFILE_KEY = "neoarabi_settings_teacher_profile";

type Profile = { name: string; email: string; phone: string };

export default function TeacherSettings() {
  const base: Profile = {
    name: currentTeacher.name,
    email: currentTeacher.email,
    phone: currentTeacher.phone ?? "",
  };
  const stored = readStoredJSON<Profile>(PROFILE_KEY, base);

  const [name, setName] = useState(stored.name);
  const [email, setEmail] = useState(stored.email);
  const [phone, setPhone] = useState(stored.phone);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function saveProfile() {
    writeStoredJSON(PROFILE_KEY, { name, email, phone });
    toast.success("Profile saved in this browser only.");
  }

  function updatePassword() {
    if (!newPw || !confirmPw) {
      toast.error("Fill in new password and confirmation.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    toast.message("Password changes require the live API — fields reset for demo.");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  }

  return (
    <TeacherLayout title="Settings">
      <div className="page-container max-w-2xl">
        <PageHeader title="Settings" description="Manage your profile (demo: saved in this browser only)" />
        <div className="space-y-6">
          <div className="surface-panel p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">Profile information</h3>
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
        </div>
      </div>
    </TeacherLayout>
  );
}
