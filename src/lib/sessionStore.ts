import { sessions as defaultSessions, type Session } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";
import { supabase } from "@/lib/supabaseClient";
import type { SessionRow } from "@/types/backend";

const SESSION_STORAGE_KEY = "neoarabi_sessions_v1";
export const SESSIONS_UPDATED_EVENT = "neoarabi-sessions-updated";
let sessionCache: Session[] = [...defaultSessions];

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
  if (sessionCache.length > 0) return [...sessionCache];
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return [...defaultSessions];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      sessionCache = parsed.filter(isSession);
      return [...sessionCache];
    }
    return [...defaultSessions];
  } catch {
    return [...defaultSessions];
  }
}

export function saveSessions(next: Session[]) {
  sessionCache = [...next];
  writeStoredJSON(SESSION_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(SESSIONS_UPDATED_EVENT));
}

function mapSessionRow(row: SessionRow & { profiles?: { full_name: string } | null; session_students?: Array<{ student_id: string }> }): Session {
  const date = new Date(row.start_at);
  return {
    id: row.id,
    title: row.title,
    subject: row.subject,
    teacherId: row.teacher_id,
    teacherName: row.profiles?.full_name ?? "Unknown Teacher",
    date: date.toISOString().slice(0, 10),
    time: date.toISOString().slice(11, 16),
    duration: row.duration_minutes,
    description: row.description,
    meetingLink: row.meeting_url ?? "",
    status: row.status,
    students: row.session_students?.map((ss) => ss.student_id) ?? [],
  };
}

export async function loadSessions() {
  if (!supabase) return getSessions();
  const { data, error } = await supabase
    .from("sessions")
    .select("id,title,subject,teacher_id,start_at,duration_minutes,description,status,meeting_url,profiles:teacher_id(full_name),session_students(student_id)")
    .order("start_at", { ascending: true });
  if (error) return getSessions();
  const mapped = (data ?? []).map((row) => mapSessionRow(row as SessionRow & { profiles?: { full_name: string } | null; session_students?: Array<{ student_id: string }> }));
  saveSessions(mapped);
  return mapped;
}

export async function createSession(input: Omit<Session, "id">): Promise<Session> {
  if (supabase) {
    const startAt = new Date(`${input.date}T${input.time}:00Z`).toISOString();
    const { data, error } = await supabase
      .from("sessions")
      .insert({
        title: input.title,
        subject: input.subject,
        teacher_id: input.teacherId,
        start_at: startAt,
        duration_minutes: input.duration,
        description: input.description,
        status: input.status,
        meeting_url: input.meetingLink || null,
        meeting_provider: input.meetingLink ? "manual" : null,
      })
      .select("id")
      .single();
    if (!error && data?.id) {
      if (input.students.length > 0) {
        await supabase.from("session_students").insert(input.students.map((studentId) => ({ session_id: data.id, student_id: studentId })));
      }
      await loadSessions();
      const created = getSessions().find((row) => row.id === data.id);
      if (created) return created;
    }
  }
  const existing = getSessions();
  const next: Session = { ...input, id: `ses_${Date.now()}` };
  saveSessions([next, ...existing]);
  return next;
}

export async function updateSession(sessionId: string, patch: Omit<Session, "id">): Promise<Session | null> {
  if (supabase) {
    const startAt = new Date(`${patch.date}T${patch.time}:00Z`).toISOString();
    const { error } = await supabase
      .from("sessions")
      .update({
        title: patch.title,
        subject: patch.subject,
        teacher_id: patch.teacherId,
        start_at: startAt,
        duration_minutes: patch.duration,
        description: patch.description,
        status: patch.status,
        meeting_url: patch.meetingLink || null,
        meeting_provider: patch.meetingLink ? "manual" : null,
      })
      .eq("id", sessionId);
    if (!error) {
      await supabase.from("session_students").delete().eq("session_id", sessionId);
      if (patch.students.length > 0) {
        await supabase.from("session_students").insert(patch.students.map((studentId) => ({ session_id: sessionId, student_id: studentId })));
      }
      await loadSessions();
      return getSessions().find((row) => row.id === sessionId) ?? null;
    }
  }
  const existing = getSessions();
  const target = existing.find((s) => s.id === sessionId);
  if (!target) return null;
  const next = existing.map((s) => (s.id === sessionId ? { ...patch, id: sessionId } : s));
  saveSessions(next);
  return { ...target, ...patch, id: sessionId };
}

export async function deleteSession(sessionId: string): Promise<boolean> {
  if (supabase) {
    const pre = await supabase.from("sessions").select("teacher_id,calendar_event_id").eq("id", sessionId).maybeSingle();
    const { error } = await supabase.from("sessions").delete().eq("id", sessionId);
    if (!error) {
      const teacherId = pre.data?.teacher_id as string | undefined;
      const calendarEventId = pre.data?.calendar_event_id as string | undefined;
      if (teacherId && calendarEventId) {
        await supabase.functions.invoke("google-calendar-provision", {
          body: {
            action: "delete",
            sessionId,
            teacherId,
            calendarEventId,
          },
        });
      }
      await loadSessions();
      return true;
    }
  }
  const existing = getSessions();
  const next = existing.filter((s) => s.id !== sessionId);
  if (next.length === existing.length) return false;
  saveSessions(next);
  return true;
}
