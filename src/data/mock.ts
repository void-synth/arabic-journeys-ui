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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: string;
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
  { id: "ses1", title: "Arabic Alphabet Basics", subject: "Arabic 101", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-15", time: "10:00", duration: 60, description: "Learn the foundational Arabic letters and pronunciation.", meetingLink: "https://meet.example.com/abc123", status: "upcoming", students: ["s1", "s2", "s3"] },
  { id: "ses2", title: "Conversational Arabic", subject: "Speaking", teacherId: "t2", teacherName: "Fatima Al-Rashid", date: "2026-04-16", time: "14:00", duration: 90, description: "Practice everyday Arabic conversations and dialogues.", meetingLink: "https://meet.example.com/def456", status: "upcoming", students: ["s1", "s4", "s5"] },
  { id: "ses3", title: "Arabic Grammar Essentials", subject: "Grammar", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-10", time: "09:00", duration: 60, description: "Core grammar rules for constructing Arabic sentences.", meetingLink: "https://meet.example.com/ghi789", status: "completed", students: ["s2", "s3", "s6"] },
  { id: "ses4", title: "Reading Comprehension", subject: "Reading", teacherId: "t4", teacherName: "Layla Mahmoud", date: "2026-04-12", time: "11:00", duration: 45, description: "Improve your Arabic reading skills with guided exercises.", meetingLink: "https://meet.example.com/jkl012", status: "completed", students: ["s1", "s2", "s5"] },
  { id: "ses5", title: "Writing Workshop", subject: "Writing", teacherId: "t2", teacherName: "Fatima Al-Rashid", date: "2026-04-18", time: "15:00", duration: 60, description: "Learn Arabic calligraphy and writing techniques.", meetingLink: "https://meet.example.com/mno345", status: "upcoming", students: ["s3", "s4", "s6"] },
  { id: "ses6", title: "Advanced Vocabulary", subject: "Vocabulary", teacherId: "t1", teacherName: "Ahmed Hassan", date: "2026-04-08", time: "13:00", duration: 60, description: "Expand your Arabic vocabulary with advanced words.", meetingLink: "https://meet.example.com/pqr678", status: "completed", students: ["s1", "s3", "s5", "s6"] },
  { id: "ses7", title: "Quranic Arabic Introduction", subject: "Quran", teacherId: "t4", teacherName: "Layla Mahmoud", date: "2026-04-20", time: "10:00", duration: 90, description: "Introduction to classical Quranic Arabic.", meetingLink: "https://meet.example.com/stu901", status: "upcoming", students: ["s2", "s4"] },
  { id: "ses8", title: "Cancelled Session", subject: "Test", teacherId: "t3", teacherName: "Omar Khalil", date: "2026-04-05", time: "16:00", duration: 30, description: "This session was cancelled.", meetingLink: "", status: "cancelled", students: [] },
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

export const notifications: Notification[] = [
  { id: "n1", title: "New Session Scheduled", message: "Arabic Alphabet Basics has been scheduled for April 15.", type: "info", read: false, createdAt: "2026-04-09T08:00:00Z" },
  { id: "n2", title: "Session Completed", message: "Arabic Grammar Essentials was completed successfully.", type: "success", read: true, createdAt: "2026-04-10T10:00:00Z" },
  { id: "n3", title: "Session Cancelled", message: "A session by Omar Khalil has been cancelled.", type: "warning", read: false, createdAt: "2026-04-05T16:00:00Z" },
  { id: "n4", title: "New Student Enrolled", message: "Olivia Davis has joined the platform.", type: "info", read: true, createdAt: "2026-05-01T09:00:00Z" },
  { id: "n5", title: "Attendance Reminder", message: "Don't forget to mark attendance for today's session.", type: "warning", read: false, createdAt: "2026-04-09T07:00:00Z" },
];

export const currentTeacher = teachers[0];
export const currentStudent = students[0];
