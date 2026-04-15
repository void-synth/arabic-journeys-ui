import { useEffect, useMemo, useState } from "react";
import { getNotifications, NOTIFICATIONS_UPDATED_EVENT } from "@/lib/notificationStore";
import type { NotificationAudience } from "@/data/mock";

export function useStoredNotifications(audience: NotificationAudience) {
  const [allRows, setAllRows] = useState(() => getNotifications());

  useEffect(() => {
    function refresh() {
      setAllRows(getNotifications());
    }
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return useMemo(() => allRows.filter((row) => row.audience === audience), [allRows, audience]);
}
