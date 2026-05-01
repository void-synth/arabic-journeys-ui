import { notifications as defaultNotifications, type Notification, type NotificationAudience } from "@/data/mock";
import { writeStoredJSON } from "@/lib/localStorageJson";
import { supabase } from "@/lib/supabaseClient";
import type { NotificationRow } from "@/types/backend";

const NOTIFICATION_STORAGE_KEY = "neoarabi_notifications_v1";
export const NOTIFICATIONS_UPDATED_EVENT = "neoarabi-notifications-updated";
let notificationCache: Notification[] = [...defaultNotifications];

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
  if (notificationCache.length > 0) return [...notificationCache];
  try {
    const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!raw) return [...defaultNotifications];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      notificationCache = parsed.filter(isNotification);
      return [...notificationCache];
    }
    return [...defaultNotifications];
  } catch {
    return [...defaultNotifications];
  }
}

function saveNotifications(next: Notification[]) {
  notificationCache = [...next];
  writeStoredJSON(NOTIFICATION_STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT));
}

export async function loadNotifications(audience: NotificationAudience) {
  if (!supabase) return notificationsForAudience(audience);
  const userResult = await supabase.auth.getUser();
  const uid = userResult.data.user?.id;
  const { data, error } = await supabase
    .from("notifications")
    .select("id,audience_role,recipient_user_id,title,message,type,created_at")
    .eq("audience_role", audience)
    .order("created_at", { ascending: false });
  if (error) return notificationsForAudience(audience);
  let readIds = new Set<string>();
  if (uid) {
    const reads = await supabase.from("notification_reads").select("notification_id").eq("user_id", uid);
    if (!reads.error) {
      readIds = new Set((reads.data ?? []).map((row) => row.notification_id as string));
    }
  }
  const mapped = (data ?? []).map((row) => {
    const n = row as NotificationRow;
    return {
      id: n.id,
      audience: n.audience_role,
      title: n.title,
      message: n.message,
      type: n.type,
      createdAt: n.created_at,
      read: readIds.has(n.id),
    } satisfies Notification;
  });
  saveNotifications(mapped);
  return mapped;
}

export function notificationsForAudience(audience: NotificationAudience): Notification[] {
  return getNotifications().filter((row) => row.audience === audience);
}

export function markNotificationRead(id: string, read: boolean) {
  if (supabase) {
    void (async () => {
      const userResult = await supabase.auth.getUser();
      const uid = userResult.data.user?.id;
      if (!uid) return;
      if (read) {
        await supabase.from("notification_reads").upsert({ notification_id: id, user_id: uid });
      } else {
        await supabase.from("notification_reads").delete().eq("notification_id", id).eq("user_id", uid);
      }
      const all = getNotifications().map((row) => (row.id === id ? { ...row, read } : row));
      saveNotifications(all);
    })();
    return;
  }
  const next = getNotifications().map((row) => (row.id === id ? { ...row, read } : row));
  saveNotifications(next);
}

export function markAudienceNotificationsRead(audience: NotificationAudience, read: boolean) {
  if (supabase) {
    void (async () => {
      const list = await loadNotifications(audience);
      const userResult = await supabase.auth.getUser();
      const uid = userResult.data.user?.id;
      if (!uid) return;
      if (read) {
        if (list.length > 0) {
          await supabase.from("notification_reads").upsert(list.map((row) => ({ notification_id: row.id, user_id: uid })));
        }
      } else {
        const ids = list.map((row) => row.id);
        if (ids.length > 0) {
          await supabase.from("notification_reads").delete().eq("user_id", uid).in("notification_id", ids);
        }
      }
      const next = getNotifications().map((row) => (row.audience === audience ? { ...row, read } : row));
      saveNotifications(next);
    })();
    return;
  }
  const next = getNotifications().map((row) => (row.audience === audience ? { ...row, read } : row));
  saveNotifications(next);
}
