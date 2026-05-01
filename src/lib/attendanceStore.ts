import { attendance, type AttendanceRecord } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";
import { supabase } from "@/lib/supabaseClient";

export type AttendanceStatus = AttendanceRecord["status"];

const ATTENDANCE_STORAGE_KEY = "neoarabi_attendance_records_v1";
export const ATTENDANCE_UPDATED_EVENT = "neoarabi-attendance-updated";
let attendanceCache: AttendanceRecord[] = [...attendance];

export function getAttendanceRecords(): AttendanceRecord[] {
  if (attendanceCache.length > 0) return [...attendanceCache];
  try {
    const raw = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (!raw) return [...attendance];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      attendanceCache = parsed.filter(isAttendanceRecord);
      return [...attendanceCache];
    }
    return [...attendance];
  } catch {
    return [...attendance];
  }
}

function isAttendanceRecord(value: unknown): value is AttendanceRecord {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.sessionId === "string" &&
    typeof row.studentId === "string" &&
    typeof row.studentName === "string" &&
    (row.status === "present" || row.status === "absent" || row.status === "late") &&
    typeof row.date === "string"
  );
}

export function saveAttendanceRecords(records: AttendanceRecord[]) {
  attendanceCache = [...records];
  writeStoredJSON(ATTENDANCE_STORAGE_KEY, records);
  window.dispatchEvent(new CustomEvent(ATTENDANCE_UPDATED_EVENT));
}

export async function loadAttendanceRecords() {
  if (!supabase) return getAttendanceRecords();
  const { data, error } = await supabase
    .from("attendance")
    .select("id,session_id,student_id,status,recorded_at,profiles:student_id(full_name)")
    .order("recorded_at", { ascending: false });
  if (error) return getAttendanceRecords();
  const mapped: AttendanceRecord[] = (data ?? []).map((row) => ({
    id: row.id as string,
    sessionId: row.session_id as string,
    studentId: row.student_id as string,
    studentName: (row.profiles as { full_name?: string } | null)?.full_name ?? "Unknown learner",
    status: row.status as AttendanceStatus,
    date: String(row.recorded_at).slice(0, 10),
  }));
  saveAttendanceRecords(mapped);
  return mapped;
}

export function upsertSessionAttendance(input: {
  sessionId: string;
  sessionDate: string;
  rows: Array<{ studentId: string; studentName: string; status: AttendanceStatus }>;
}) {
  if (supabase) {
    void (async () => {
      const user = await supabase.auth.getUser();
      const uid = user.data.user?.id;
      if (!uid) return;
      const payload = input.rows.map((row) => ({
        session_id: input.sessionId,
        student_id: row.studentId,
        status: row.status,
        recorded_by: uid,
      }));
      await supabase.from("attendance").upsert(payload, { onConflict: "session_id,student_id" });
      await loadAttendanceRecords();
    })();
    return;
  }
  const existing = getAttendanceRecords().filter((row) => row.sessionId !== input.sessionId);
  const timestampSeed = Date.now();
  const nextRows: AttendanceRecord[] = input.rows.map((row, index) => ({
    id: `a_${input.sessionId}_${row.studentId}_${timestampSeed}_${index}`,
    sessionId: input.sessionId,
    studentId: row.studentId,
    studentName: row.studentName,
    status: row.status,
    date: input.sessionDate,
  }));
  saveAttendanceRecords([...existing, ...nextRows]);
}
