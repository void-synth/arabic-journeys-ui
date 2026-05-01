import { supabase } from "@/lib/supabaseClient";
import type { StudentOnboardingState } from "@/lib/studentOnboarding";

export async function syncStudentOnboardingToSupabase(userId: string, state: StudentOnboardingState) {
  if (!supabase) return;
  const { error } = await supabase.from("profiles").update({ student_onboarding: state }).eq("id", userId);
  if (error && import.meta.env.DEV) {
    console.warn("[studentOnboardingSync]", error.message);
  }
}
