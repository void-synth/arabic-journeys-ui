const RING_KEY = "neoarabi_analytics_ring_v1";
const RING_MAX = 50;

export function logEvent(name: string, props?: Record<string, unknown>) {
  const payload = { name, props: props ?? {}, ts: new Date().toISOString() };
  if (import.meta.env.DEV) {
    console.debug("[analytics]", name, props ?? {});
  }
  try {
    const raw = localStorage.getItem(RING_KEY);
    const ring: unknown[] = raw ? (JSON.parse(raw) as unknown[]) : [];
    ring.push(payload);
    while (ring.length > RING_MAX) ring.shift();
    localStorage.setItem(RING_KEY, JSON.stringify(ring));
  } catch {
    /* ignore */
  }
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (endpoint && typeof fetch !== "undefined") {
    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}
