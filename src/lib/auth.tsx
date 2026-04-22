import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { currentStudent, currentTeacher } from "@/data/mock";

export type DemoRole = "teacher" | "student" | "admin";

type DemoAuthState = {
  isAuthenticated: boolean;
  role: DemoRole | null;
  userName: string;
};

type AuthContextValue = DemoAuthState & {
  loginAs: (role: DemoRole) => void;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "neoarabi_demo_auth_v1";

const defaultState: DemoAuthState = {
  isAuthenticated: false,
  role: null,
  userName: "",
};

const AuthContext = createContext<AuthContextValue | null>(null);

function nameForRole(role: DemoRole): string {
  if (role === "teacher") return currentTeacher.name;
  if (role === "student") return currentStudent.name;
  return "Platform admin";
}

function readStoredState(): DemoAuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<DemoAuthState>;
    if (!parsed || typeof parsed !== "object") return defaultState;
    const role = parsed.role;
    if (role !== "teacher" && role !== "student" && role !== "admin") return defaultState;
    return {
      isAuthenticated: true,
      role,
      userName: typeof parsed.userName === "string" && parsed.userName ? parsed.userName : nameForRole(role),
    };
  } catch {
    return defaultState;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoAuthState>(() => readStoredState());

  function loginAs(role: DemoRole) {
    const next: DemoAuthState = {
      isAuthenticated: true,
      role,
      userName: nameForRole(role),
    };
    setState(next);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
  }

  function logout() {
    setState(defaultState);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      loginAs,
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
