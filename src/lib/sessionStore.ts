import { sessions as defaultSessions, type Session } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";

const SESSION_STORAGE_KEY = "neoarabi_sessions_v1";
export const SESSIONS_UPDATED_EVENT = "neoarabi-sessions-updated";

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.title === "string" &&
    typeof row.subject === "string" &&
    typeof row.teacherId === "string" &&
    typeof row.teacherName === "string" &&
    typeof row.date === "string" &&
    typeof row.time === "string" &&
    typeof row.duration === "number" &&
    typeof row.description === "string" &&
    typeof row.meetingLink === "string" &&
    (row.status === "upcoming" || row.status === "ongoing" || row.status === "completed" || row.status === "cancelled") &&
    Array.isArray(row.students)
  );
}

export function getSessions(): Session[] {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return [...defaultSessions];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter(isSession);
    return [...defaultSessions];
  } catch {
    return [...defaultSessions];
  }
}

export function saveSessions(next: Session[]) {
  writeStoredJSON(SESSION_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(SESSIONS_UPDATED_EVENT));
}

export function createSession(input: Omit<Session, "id">): Session {
  const existing = getSessions();
  const next: Session = {
    ...input,
    id: `ses_${Date.now()}`,
  };
  saveSessions([next, ...existing]);
  return next;
}

export function updateSession(sessionId: string, patch: Omit<Session, "id">): Session | null {
  const existing = getSessions();
  const target = existing.find((s) => s.id === sessionId);
  if (!target) return null;
  const next = existing.map((s) => (s.id === sessionId ? { ...patch, id: sessionId } : s));
  saveSessions(next);
  return { ...target, ...patch, id: sessionId };
}

export function deleteSession(sessionId: string): boolean {
  const existing = getSessions();
  const next = existing.filter((s) => s.id !== sessionId);
  if (next.length === existing.length) return false;
  saveSessions(next);
  return true;
}
