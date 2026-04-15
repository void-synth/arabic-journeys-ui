import { writeStoredJSON } from "@/lib/localStorageJson";

const ASSIGNMENTS_STORAGE_KEY = "neoarabi_teacher_student_map_v1";
export const TEACHER_ASSIGNMENTS_UPDATED_EVENT = "neoarabi-teacher-assignments-updated";

type TeacherStudentMap = Record<string, string[]>;

function isTeacherStudentMap(value: unknown): value is TeacherStudentMap {
  if (!value || typeof value !== "object") return false;
  for (const entry of Object.values(value as Record<string, unknown>)) {
    if (!Array.isArray(entry)) return false;
    if (!entry.every((studentId) => typeof studentId === "string")) return false;
  }
  return true;
}

export function getTeacherStudentMap(): TeacherStudentMap {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return isTeacherStudentMap(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveTeacherStudentMap(next: TeacherStudentMap) {
  writeStoredJSON(ASSIGNMENTS_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(TEACHER_ASSIGNMENTS_UPDATED_EVENT));
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
  const map = getTeacherStudentMap();
  const existing = new Set(map[teacherId] ?? []);
  for (const studentId of studentIds) existing.add(studentId);
  map[teacherId] = [...existing];
  saveTeacherStudentMap(map);
}
