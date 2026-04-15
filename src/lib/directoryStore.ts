import { students as defaultStudents, teachers as defaultTeachers, type User } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";

const STUDENTS_STORAGE_KEY = "neoarabi_students_v1";
const TEACHERS_STORAGE_KEY = "neoarabi_teachers_v1";
export const DIRECTORY_UPDATED_EVENT = "neoarabi-directory-updated";

function isRole(value: unknown): value is User["role"] {
  return value === "teacher" || value === "student" || value === "admin";
}

function isStatus(value: unknown): value is User["status"] {
  return value === "active" || value === "inactive";
}

function isUser(value: unknown): value is User {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.name === "string" &&
    typeof row.email === "string" &&
    isRole(row.role) &&
    typeof row.joinedDate === "string" &&
    isStatus(row.status)
  );
}

function readUsers(key: string, fallback: User[]): User[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [...fallback];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter(isUser);
    return [...fallback];
  } catch {
    return [...fallback];
  }
}

function saveUsers(key: string, rows: User[]) {
  writeStoredJSON(key, rows);
  window.dispatchEvent(new CustomEvent(DIRECTORY_UPDATED_EVENT));
}

export function getStudentsStore(): User[] {
  return readUsers(STUDENTS_STORAGE_KEY, defaultStudents);
}

export function getTeachersStore(): User[] {
  return readUsers(TEACHERS_STORAGE_KEY, defaultTeachers);
}

export function saveStudentsStore(rows: User[]) {
  saveUsers(STUDENTS_STORAGE_KEY, rows);
}

export function saveTeachersStore(rows: User[]) {
  saveUsers(TEACHERS_STORAGE_KEY, rows);
}

export function upsertStudent(input: { id?: string; name: string; email: string; phone?: string }) {
  const rows = getStudentsStore();
  if (input.id) {
    const next = rows.map((row) => (row.id === input.id ? { ...row, name: input.name, email: input.email, phone: input.phone } : row));
    saveStudentsStore(next);
    return input.id;
  }
  const id = `s_${Date.now()}`;
  const nextRow: User = {
    id,
    role: "student",
    name: input.name,
    email: input.email,
    phone: input.phone,
    joinedDate: new Date().toISOString().slice(0, 10),
    status: "active",
  };
  saveStudentsStore([nextRow, ...rows]);
  return id;
}

export function toggleStudentStatus(id: string) {
  const rows = getStudentsStore().map((row) =>
    row.id === id ? { ...row, status: row.status === "active" ? "inactive" : "active" } : row
  );
  saveStudentsStore(rows);
}

export function toggleTeacherStatus(id: string) {
  const rows = getTeachersStore().map((row) =>
    row.id === id ? { ...row, status: row.status === "active" ? "inactive" : "active" } : row
  );
  saveTeachersStore(rows);
}
