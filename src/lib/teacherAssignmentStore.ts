import { writeStoredJSON } from "@/lib/localStorageJson";
import { supabase } from "@/lib/supabaseClient";

const ASSIGNMENTS_STORAGE_KEY = "neoarabi_teacher_student_map_v1";
export const TEACHER_ASSIGNMENTS_UPDATED_EVENT = "neoarabi-teacher-assignments-updated";

type TeacherStudentMap = Record<string, string[]>;
let assignmentCache: TeacherStudentMap = {};

function isTeacherStudentMap(value: unknown): value is TeacherStudentMap {
  if (!value || typeof value !== "object") return false;
  for (const entry of Object.values(value as Record<string, unknown>)) {
    if (!Array.isArray(entry)) return false;
    if (!entry.every((studentId) => typeof studentId === "string")) return false;
  }
  return true;
}

export function getTeacherStudentMap(): TeacherStudentMap {
  if (Object.keys(assignmentCache).length > 0) return assignmentCache;
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    assignmentCache = isTeacherStudentMap(parsed) ? parsed : {};
    return assignmentCache;
  } catch {
    return {};
  }
}

export function saveTeacherStudentMap(next: TeacherStudentMap) {
  assignmentCache = next;
  writeStoredJSON(ASSIGNMENTS_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(TEACHER_ASSIGNMENTS_UPDATED_EVENT));
}

export async function loadTeacherStudentMap() {
  if (!supabase) return getTeacherStudentMap();
  const { data, error } = await supabase.from("teacher_student_assignments").select("teacher_id,student_id");
  if (error) return getTeacherStudentMap();
  const next: TeacherStudentMap = {};
  for (const row of data ?? []) {
    const teacherId = row.teacher_id as string;
    const studentId = row.student_id as string;
    if (!next[teacherId]) next[teacherId] = [];
    next[teacherId].push(studentId);
  }
  saveTeacherStudentMap(next);
  return next;
}

export function getAssignedStudentIdsForTeacher(teacherId: string): Set<string> {
  const map = getTeacherStudentMap();
  return new Set(map[teacherId] ?? []);
}

export function getAssignedTeacherIdsForStudent(studentId: string): string[] {
  const map = getTeacherStudentMap();
  return Object.entries(map)
    .filter(([, studentIds]) => studentIds.includes(studentId))
    .map(([teacherId]) => teacherId);
}

export function setStudentTeacherAssignments(studentId: string, teacherIds: string[]) {
  if (supabase) {
    void (async () => {
      const existing = await supabase.from("teacher_student_assignments").select("teacher_id").eq("student_id", studentId);
      if (!existing.error && existing.data) {
        await supabase.from("teacher_student_assignments").delete().eq("student_id", studentId);
      }
      if (teacherIds.length > 0) {
        await supabase
          .from("teacher_student_assignments")
          .insert(teacherIds.map((teacherId) => ({ teacher_id: teacherId, student_id: studentId })));
      }
      await loadTeacherStudentMap();
    })();
    return;
  }
  const map = getTeacherStudentMap();
  const cleanTeacherIds = Array.from(new Set(teacherIds));
  for (const [teacherId, studentIds] of Object.entries(map)) {
    map[teacherId] = studentIds.filter((id) => id !== studentId);
  }
  for (const teacherId of cleanTeacherIds) {
    const existing = new Set(map[teacherId] ?? []);
    existing.add(studentId);
    map[teacherId] = [...existing];
  }
  saveTeacherStudentMap(map);
}

export function assignStudentsToTeacher(studentIds: string[], teacherId: string) {
  if (supabase) {
    void (async () => {
      if (studentIds.length === 0) return;
      await supabase
        .rpc("admin_assign_students_to_teacher", { in_teacher_id: teacherId, in_student_ids: studentIds })
        .throwOnError();
      await loadTeacherStudentMap();
    })();
    return;
  }
  const map = getTeacherStudentMap();
  const existing = new Set(map[teacherId] ?? []);
  for (const studentId of studentIds) existing.add(studentId);
  map[teacherId] = [...existing];
  saveTeacherStudentMap(map);
}
