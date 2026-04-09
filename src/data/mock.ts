export interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "student" | "admin";
  avatar?: string;
  phone?: string;
  joinedDate: string;
  status: "active" | "inactive";
}

export interface Session {
  id: string;
  title: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  date: string;
  time: string;
  duration: number;
  description: string;
  meetingLink: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  students: string[];
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  status: "present" | "absent" | "late";
  date: string;
}

export type NotificationAudience = "teacher" | "student" | "admin";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: string;
  audience: NotificationAudience;
}

export const teachers: User[] = [
  { id: "t1", name: "Ahmed Hassan", email: "ahmed@arabiclearn.com", role: "teacher", phone: "+1234567890", joinedDate: "2024-01-15", status: "active" },
  { id: "t2", name: "Fatima Al-Rashid", email: "fatima@arabiclearn.com", role: "teacher", phone: "+1234567891", joinedDate: "2024-02-20", status: "active" },
  { id: "t3", name: "Omar Khalil", email: "omar@arabiclearn.com", role: "teacher", phone: "+1234567892", joinedDate: "2024-03-10", status: "inactive" },
  { id: "t4", name: "Layla Mahmoud", email: "layla@arabiclearn.com", role: "teacher", phone: "+1234567893", joinedDate: "2024-04-05", status: "active" },
];

export const students: User[] = [
  { id: "s1", name: "Sarah Johnson", email: "sarah@email.com", role: "student", phone: "+9876543210", joinedDate: "2024-03-01", status: "active" },
  { id: "s2", name: "Michael Chen", email: "michael@email.com", role: "student", phone: "+9876543211", joinedDate: "2024-03-15", status: "active" },
  { id: "s3", name: "Emma Williams", email: "emma@email.com", role: "student", phone: "+9876543212", joinedDate: "2024-04-01", status: "active" },
  { id: "s4", name: "James Brown", email: "james@email.com", role: "student", phone: "+9876543213", joinedDate: "2024-04-10", status: "inactive" },
  { id: "s5", name: "Olivia Davis", email: "olivia@email.com", role: "student", phone: "+9876543214", joinedDate: "2024-05-01", status: "active" },
  { id: "s6", name: "Liam Wilson", email: "liam@email.com", role: "student", phone: "+9876543215", joinedDate: "2024-05-15", status: "active" },
];

export const sessions: Session[] = [
  { id: "ses1", title: "Arabic Alphabet Basics", subject: "Arabic 101", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-15", time: "10:00", duration: 60, description: "Letters, short vowels, and pronunciation drills.", meetingLink: "https://meet.example.com/abc123", status: "upcoming", students: ["s1", "s2", "s3"] },
  { id: "ses2", title: "Conversational Arabic", subject: "Speaking", teacherId: "t2", teacherName: "Fatima Al-Rashid", date: "2026-04-16", time: "14:00", duration: 90, description: "Everyday dialogues and classroom role-play.", meetingLink: "https://meet.example.com/def456", status: "upcoming", students: ["s1", "s4", "s5"] },
  { id: "ses3", title: "Arabic Grammar Essentials", subject: "Grammar", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-10", time: "09:00", duration: 60, description: "Sentence patterns, agreement, and common structures.", meetingLink: "https://meet.example.com/ghi789", status: "completed", students: ["s2", "s3", "s6"] },
  { id: "ses4", title: "Reading Comprehension", subject: "Reading", teacherId: "t4", teacherName: "Layla Mahmoud", date: "2026-04-12", time: "11:00", duration: 45, description: "Short texts with guided questions.", meetingLink: "https://meet.example.com/jkl012", status: "completed", students: ["s1", "s2", "s5"] },
  { id: "ses5", title: "Writing Workshop", subject: "Writing", teacherId: "t2", teacherName: "Fatima Al-Rashid", date: "2026-04-18", time: "15:00", duration: 60, description: "Connecting letters, words, and simple paragraphs.", meetingLink: "https://meet.example.com/mno345", status: "upcoming", students: ["s3", "s4", "s6"] },
  { id: "ses6", title: "Advanced Vocabulary", subject: "Vocabulary", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-08", time: "13:00", duration: 60, description: "Thematic word lists and usage in context.", meetingLink: "https://meet.example.com/pqr678", status: "completed", students: ["s1", "s3", "s5", "s6"] },
  { id: "ses7", title: "Quranic Arabic Introduction", subject: "Quran", teacherId: "t4", teacherName: "Layla Mahmoud", date: "2026-04-20", time: "10:00", duration: 90, description: "Introduction to classical style and common phrases.", meetingLink: "https://meet.example.com/stu901", status: "upcoming", students: ["s2", "s4"] },
  { id: "ses8", title: "Cancelled Session", subject: "Test", teacherId: "t3", teacherName: "Omar Khalil", date: "2026-04-05", time: "16:00", duration: 30, description: "Cancelled by the school.", meetingLink: "", status: "cancelled", students: [] },
];

export const attendance: AttendanceRecord[] = [
  { id: "a1", sessionId: "ses3", studentId: "s2", studentName: "Michael Chen", status: "present", date: "2026-04-10" },
  { id: "a2", sessionId: "ses3", studentId: "s3", studentName: "Emma Williams", status: "present", date: "2026-04-10" },
  { id: "a3", sessionId: "ses3", studentId: "s6", studentName: "Liam Wilson", status: "late", date: "2026-04-10" },
  { id: "a4", sessionId: "ses4", studentId: "s1", studentName: "Sarah Johnson", status: "present", date: "2026-04-12" },
  { id: "a5", sessionId: "ses4", studentId: "s2", studentName: "Michael Chen", status: "absent", date: "2026-04-12" },
  { id: "a6", sessionId: "ses4", studentId: "s5", studentName: "Olivia Davis", status: "present", date: "2026-04-12" },
  { id: "a7", sessionId: "ses6", studentId: "s1", studentName: "Sarah Johnson", status: "present", date: "2026-04-08" },
  { id: "a8", sessionId: "ses6", studentId: "s3", studentName: "Emma Williams", status: "late", date: "2026-04-08" },
  { id: "a9", sessionId: "ses6", studentId: "s5", studentName: "Olivia Davis", status: "present", date: "2026-04-08" },
  { id: "a10", sessionId: "ses6", studentId: "s6", studentName: "Liam Wilson", status: "absent", date: "2026-04-08" },
];

/** In-app messages scoped by role (demo data). */
export const notifications: Notification[] = [
  {
    id: "nt1",
    audience: "teacher",
    title: "Upcoming class: Arabic Alphabet Basics",
    message: "Tomorrow 10:00 — room link is on the session card.",
    type: "info",
    read: false,
    createdAt: "2026-04-09T08:00:00Z",
  },
  {
    id: "nt2",
    audience: "teacher",
    title: "Attendance not submitted",
    message: "Grammar Essentials (Apr 10) is still open for attendance.",
    type: "warning",
    read: false,
    createdAt: "2026-04-09T07:00:00Z",
  },
  {
    id: "nt3",
    audience: "teacher",
    title: "Session marked complete",
    message: "Reading Comprehension — attendance saved.",
    type: "success",
    read: true,
    createdAt: "2026-04-12T11:30:00Z",
  },
  {
    id: "ns1",
    audience: "student",
    title: "Your next class",
    message: "Arabic Alphabet Basics · Apr 15 at 10:00.",
    type: "info",
    read: false,
    createdAt: "2026-04-09T08:00:00Z",
  },
  {
    id: "ns2",
    audience: "student",
    title: "Class completed",
    message: "Grammar Essentials — materials stay in Session history.",
    type: "success",
    read: true,
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "ns3",
    audience: "student",
    title: "Join link ready",
    message: "Conversational Arabic opens 10 minutes before start.",
    type: "info",
    read: false,
    createdAt: "2026-04-09T12:00:00Z",
  },
  {
    id: "na1",
    audience: "admin",
    title: "New enrollment",
    message: "Olivia Davis was added to the student directory.",
    type: "info",
    read: true,
    createdAt: "2026-05-01T09:00:00Z",
  },
  {
    id: "na2",
    audience: "admin",
    title: "Teacher inactive",
    message: "Omar Khalil is marked inactive — sessions may need reassignment.",
    type: "warning",
    read: false,
    createdAt: "2026-04-05T16:00:00Z",
  },
  {
    id: "na3",
    audience: "admin",
    title: "Weekly snapshot",
    message: "7 sessions this week · 6 active teachers · mock totals.",
    type: "success",
    read: true,
    createdAt: "2026-04-09T06:00:00Z",
  },
];

export function notificationsForAudience(audience: NotificationAudience): Notification[] {
  return notifications.filter((n) => n.audience === audience);
}

export function getStudentIdsForTeacher(teacherId: string): Set<string> {
  const ids = new Set<string>();
  for (const s of sessions) {
    if (s.teacherId !== teacherId) continue;
    for (const sid of s.students) ids.add(sid);
  }
  return ids;
}

export function getStudentsForTeacher(teacherId: string): User[] {
  const allowed = getStudentIdsForTeacher(teacherId);
  return students.filter((u) => allowed.has(u.id));
}

export function teacherTeachesStudent(teacherId: string, studentId: string): boolean {
  return getStudentIdsForTeacher(teacherId).has(studentId);
}

export const currentTeacher = teachers[0];
export const currentStudent = students[0];

export interface AdminActivity {
  id: string;
  label: string;
  detail: string;
  time: string;
  tone: "neutral" | "success" | "warning";
}

export const adminActivity: AdminActivity[] = [
  { id: "act1", label: "Session completed", detail: "Arabic Grammar Essentials · Ahmed Hassan", time: "2h ago", tone: "success" },
  { id: "act2", label: "Enrollment", detail: "Olivia Davis added to the directory", time: "5h ago", tone: "neutral" },
  { id: "act3", label: "Teacher status", detail: "Omar Khalil set to inactive", time: "1d ago", tone: "warning" },
  { id: "act4", label: "Session scheduled", detail: "Quranic Arabic Introduction · Layla Mahmoud", time: "1d ago", tone: "neutral" },
];
