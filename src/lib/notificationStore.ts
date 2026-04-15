import { notifications as defaultNotifications, type Notification, type NotificationAudience } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";

const NOTIFICATION_STORAGE_KEY = "neoarabi_notifications_v1";
export const NOTIFICATIONS_UPDATED_EVENT = "neoarabi-notifications-updated";

function isNotification(value: unknown): value is Notification {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.title === "string" &&
    typeof row.message === "string" &&
    (row.type === "info" || row.type === "success" || row.type === "warning") &&
    typeof row.read === "boolean" &&
    typeof row.createdAt === "string" &&
    (row.audience === "teacher" || row.audience === "student" || row.audience === "admin")
  );
}

export function getNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!raw) return [...defaultNotifications];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter(isNotification);
    return [...defaultNotifications];
  } catch {
    return [...defaultNotifications];
  }
}

function saveNotifications(next: Notification[]) {
  writeStoredJSON(NOTIFICATION_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT));
}

export function notificationsForAudience(audience: NotificationAudience): Notification[] {
  return getNotifications().filter((row) => row.audience === audience);
}

export function markNotificationRead(id: string, read: boolean) {
  const next = getNotifications().map((row) => (row.id === id ? { ...row, read } : row));
  saveNotifications(next);
}

export function markAudienceNotificationsRead(audience: NotificationAudience, read: boolean) {
  const next = getNotifications().map((row) => (row.audience === audience ? { ...row, read } : row));
  saveNotifications(next);
}
