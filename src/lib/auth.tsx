import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabase } from "@/lib/supabaseClient";

export type AppRole = "teacher" | "student" | "admin";

type AuthState = {
  isReady: boolean;
  isAuthenticated: boolean;
  role: AppRole | null;
  userName: string;
  userAvatar: string;
  userId: string | null;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<{ error?: string; role?: AppRole }>;
  signup: (payload: { fullName: string; email: string; password: string; role: AppRole }) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  refreshSession: () => Promise<void>;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "neoarabi_auth_v2";
const MISSING_PROFILE_ERROR = "Your account is missing a profile record. Contact an admin to complete setup.";

const defaultState: AuthState = {
  isReady: false,
  isAuthenticated: false,
  role: null,
  userName: "",
  userAvatar: "",
  userId: null,
};

const AuthContext = createContext<AuthContextValue | null>(null);
function isAppRole(value: unknown): value is AppRole {
  return value === "teacher" || value === "student" || value === "admin";
}

function normalizeAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("unsupported provider")) {
    return "Google sign-in is not enabled in Supabase Authentication providers.";
  }
  if (lower.includes("redirect_uri_mismatch")) {
    return "Google OAuth redirect URI mismatch. Add your Supabase callback URL in Google Cloud Console.";
  }
  if (lower.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  return message;
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
}

function readStoredState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AuthState>;
    if (!parsed || typeof parsed !== "object") return defaultState;
    const role = parsed.role;
    if (!isAppRole(role)) return defaultState;
    const isAuthenticated = parsed.isAuthenticated === true;
    const userId = typeof parsed.userId === "string" ? parsed.userId : null;
    if (isAuthenticated && !userId) return defaultState;
    return {
      isReady: true,
      isAuthenticated,
      role,
      userName: typeof parsed.userName === "string" ? parsed.userName : "",
      userAvatar: typeof parsed.userAvatar === "string" ? parsed.userAvatar : "",
      userId,
    };
  } catch {
    return defaultState;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => readStoredState());

  async function getProfile(userId: string) {
    if (!supabase) return { profile: null, error: new Error("Supabase is not configured.") };
    const result = await supabase
      .from("profiles")
      .select("id,role,full_name,avatar_url")
      .eq("id", userId)
      .maybeSingle();
    return { profile: result.data, error: result.error };
  }

  async function hydrateFromSupabaseSession(): Promise<{ error?: string; role?: AppRole }> {
    if (!supabase) {
      setState({ ...defaultState, isReady: true });
      return { error: "Supabase is not configured." };
    }
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    if (!session?.user) {
      setState({ ...defaultState, isReady: true });
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return {};
    }
    return hydrateFromUser(session.user);
  }

  async function hydrateFromUser(user: User): Promise<{ error?: string; role?: AppRole }> {
    let { profile, error } = await getProfile(user.id);
    if (error) {
      await wait(75);
      const retry = await getProfile(user.id);
      profile = retry.profile;
      error = retry.error;
    }
    if (error) {
      setState({ ...defaultState, isReady: true });
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { error: `Unable to load account profile. ${error.message}` };
    }
    if (!profile || !isAppRole(profile.role)) {
      setState({ ...defaultState, isReady: true });
      localStorage.removeItem(AUTH_STORAGE_KEY);
      await supabase.auth.signOut();
      return { error: MISSING_PROFILE_ERROR };
    }

    const role = profile.role;
    const next: AuthState = {
      isReady: true,
      isAuthenticated: true,
      role,
      userName: profile?.full_name ?? user.email ?? "",
      userAvatar: profile?.avatar_url ?? "",
      userId: user.id,
    };
    setState(next);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
    return { role };
  }

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      setState({ ...defaultState, isReady: true });
      return;
    }
    void hydrateFromSupabaseSession();
    const { data } = supabase.auth.onAuthStateChange(() => {
      void hydrateFromSupabaseSession();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string): Promise<{ error?: string; role?: AppRole }> {
    if (!supabase) return { error: "Supabase is not configured." };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: normalizeAuthError(error.message) };
    const signedInUser = data.user;
    if (!signedInUser) {
      // Rare race: wait briefly for session propagation and retry.
      await wait(75);
      const me = await supabase.auth.getUser();
      if (!me.data.user) {
        return { error: "Sign-in succeeded but session is not ready yet. Please try again." };
      }
      const retryResult = await hydrateFromUser(me.data.user);
      if (retryResult.error) return { error: normalizeAuthError(retryResult.error) };
      return { role: retryResult.role };
    }
    const result = await hydrateFromUser(signedInUser);
    if (result.error) return { error: normalizeAuthError(result.error) };
    return { role: result.role };
  }

  async function signup(payload: { fullName: string; email: string; password: string; role: AppRole }): Promise<{ error?: string }> {
    if (!supabase) return { error: "Supabase is not configured." };
    const { error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
        data: {
          full_name: payload.fullName,
          role: payload.role,
        },
      },
    });
    if (error) return { error: normalizeAuthError(error.message) };
    return {};
  }

  async function signInWithGoogle(): Promise<{ error?: string }> {
    if (!supabase) return { error: "Supabase is not configured." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) return { error: normalizeAuthError(error.message) };
    return {};
  }

  function logout() {
    if (supabase) {
      void supabase.auth.signOut();
    }
    setState({ ...defaultState, isReady: true });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      signup,
      signInWithGoogle,
      refreshSession: hydrateFromSupabaseSession,
      logout,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
