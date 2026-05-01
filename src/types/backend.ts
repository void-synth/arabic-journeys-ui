export type AppRole = "admin" | "teacher" | "student";
export type AppStatus = "active" | "inactive";
export type SessionStatus = "upcoming" | "ongoing" | "completed" | "cancelled";
export type AttendanceStatus = "present" | "absent" | "late";
export type NotificationType = "info" | "success" | "warning";

export interface ProfileRow {
  id: string;
  role: AppRole;
  full_name: string;
  email: string;
  phone: string | null;
  status: AppStatus;
  avatar_url: string | null;
  /** Optional JSON mirror of client student onboarding state */
  student_onboarding?: unknown;
  created_at: string;
  updated_at: string;
}

export interface SessionRow {
  id: string;
  title: string;
  subject: string;
  teacher_id: string;
  start_at: string;
  duration_minutes: number;
  description: string;
  status: SessionStatus;
  meeting_provider: string | null;
  meeting_url: string | null;
  calendar_event_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SessionStudentRow {
  session_id: string;
  student_id: string;
  created_at: string;
}

export interface AttendanceRow {
  id: string;
  session_id: string;
  student_id: string;
  status: AttendanceStatus;
  recorded_by: string;
  recorded_at: string;
}

export interface TeacherStudentAssignmentRow {
  teacher_id: string;
  student_id: string;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  audience_role: AppRole;
  recipient_user_id: string | null;
  title: string;
  message: string;
  type: NotificationType;
  created_at: string;
}
