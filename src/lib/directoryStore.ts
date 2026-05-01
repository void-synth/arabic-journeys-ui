import { students as defaultStudents, teachers as defaultTeachers, type User } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";
import { supabase } from "@/lib/supabaseClient";
import type { ProfileRow } from "@/types/backend";

const STUDENTS_STORAGE_KEY = "neoarabi_students_v1";
const TEACHERS_STORAGE_KEY = "neoarabi_teachers_v1";
export const DIRECTORY_UPDATED_EVENT = "neoarabi-directory-updated";
let studentsCache: User[] = [...defaultStudents];
let teachersCache: User[] = [...defaultTeachers];

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
  if (studentsCache.length > 0) return [...studentsCache];
  studentsCache = readUsers(STUDENTS_STORAGE_KEY, defaultStudents);
  return [...studentsCache];
}

export function getTeachersStore(): User[] {
  if (teachersCache.length > 0) return [...teachersCache];
  teachersCache = readUsers(TEACHERS_STORAGE_KEY, defaultTeachers);
  return [...teachersCache];
}

export function saveStudentsStore(rows: User[]) {
  studentsCache = [...rows];
  saveUsers(STUDENTS_STORAGE_KEY, rows);
}

export function saveTeachersStore(rows: User[]) {
  teachersCache = [...rows];
  saveUsers(TEACHERS_STORAGE_KEY, rows);
}

function mapProfileRow(row: ProfileRow): User {
  return {
    id: row.id,
    role: row.role,
    name: row.full_name,
    email: row.email,
    phone: row.phone ?? undefined,
    joinedDate: row.created_at.slice(0, 10),
    status: row.status,
    avatar: row.avatar_url ?? undefined,
  };
}

export async function loadDirectoryStore() {
  if (!supabase) return { students: getStudentsStore(), teachers: getTeachersStore() };
  const { data, error } = await supabase
    .from("profiles")
    .select("id,role,full_name,email,phone,status,avatar_url,created_at,updated_at");
  if (error) return { students: getStudentsStore(), teachers: getTeachersStore() };
  const mapped = (data ?? []).map((row) => mapProfileRow(row as ProfileRow));
  const nextStudents = mapped.filter((row) => row.role === "student");
  const nextTeachers = mapped.filter((row) => row.role === "teacher");
  saveStudentsStore(nextStudents);
  saveTeachersStore(nextTeachers);
  return { students: nextStudents, teachers: nextTeachers };
}

export async function upsertStudent(input: { id?: string; name: string; email: string; phone?: string }) {
  if (supabase && input.id) {
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: input.name, email: input.email, phone: input.phone ?? null })
      .eq("id", input.id);
    if (!error) {
      await loadDirectoryStore();
      return input.id;
    }
  }
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
  if (supabase) {
    void (async () => {
      const target = getStudentsStore().find((row) => row.id === id);
      if (!target) return;
      const nextStatus = target.status === "active" ? "inactive" : "active";
      const { error } = await supabase.from("profiles").update({ status: nextStatus }).eq("id", id);
      if (!error) await loadDirectoryStore();
    })();
    return;
  }
  const rows = getStudentsStore().map((row) =>
    row.id === id ? { ...row, status: row.status === "active" ? "inactive" : "active" } : row
  );
  saveStudentsStore(rows);
}

export function toggleTeacherStatus(id: string) {
  if (supabase) {
    void (async () => {
      const target = getTeachersStore().find((row) => row.id === id);
      if (!target) return;
      const nextStatus = target.status === "active" ? "inactive" : "active";
      const { error } = await supabase.from("profiles").update({ status: nextStatus }).eq("id", id);
      if (!error) await loadDirectoryStore();
    })();
    return;
  }
  const rows = getTeachersStore().map((row) =>
    row.id === id ? { ...row, status: row.status === "active" ? "inactive" : "active" } : row
  );
  saveTeachersStore(rows);
}
