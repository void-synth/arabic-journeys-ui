import { useEffect, useState } from "react";
import { getSessions, loadSessions, SESSIONS_UPDATED_EVENT } from "@/lib/sessionStore";
import type { Session } from "@/data/mock";

export function useStoredSessions() {
  const [sessions, setSessions] = useState<Session[]>(() => getSessions());

  useEffect(() => {
    function refresh() {
      void loadSessions().then(setSessions);
    }
    void loadSessions().then(setSessions);
    window.addEventListener(SESSIONS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SESSIONS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return sessions;
}
