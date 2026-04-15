import { attendance, type AttendanceRecord } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";

export type AttendanceStatus = AttendanceRecord["status"];

const ATTENDANCE_STORAGE_KEY = "neoarabi_attendance_records_v1";
export const ATTENDANCE_UPDATED_EVENT = "neoarabi-attendance-updated";

export function getAttendanceRecords(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (!raw) return [...attendance];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter(isAttendanceRecord);
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
  writeStoredJSON(ATTENDANCE_STORAGE_KEY, records);
  window.dispatchEvent(new CustomEvent(ATTENDANCE_UPDATED_EVENT));
}

export function upsertSessionAttendance(input: {
  sessionId: string;
  sessionDate: string;
  rows: Array<{ studentId: string; studentName: string; status: AttendanceStatus }>;
}) {
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
