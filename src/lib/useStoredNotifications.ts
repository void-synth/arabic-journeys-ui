import { useEffect, useMemo, useState } from "react";
import { getNotifications, loadNotifications, NOTIFICATIONS_UPDATED_EVENT } from "@/lib/notificationStore";
import type { NotificationAudience } from "@/data/mock";

export function useStoredNotifications(audience: NotificationAudience) {
  const [allRows, setAllRows] = useState(() => getNotifications());

  useEffect(() => {
    function refresh() {
      void loadNotifications(audience).then(() => setAllRows(getNotifications()));
    }
    void loadNotifications(audience).then(() => setAllRows(getNotifications()));
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [audience]);

  return useMemo(() => allRows.filter((row) => row.audience === audience), [allRows, audience]);
}
