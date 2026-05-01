import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type Payload = {
  sessionId: string;
  teacherId: string;
  title: string;
  description?: string;
  startAt: string;
  durationMinutes: number;
  action?: "upsert" | "delete";
  calendarEventId?: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const payload = (await req.json().catch(() => null)) as Payload | null;
  if (!payload?.sessionId || !payload?.teacherId) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
  if (!supabaseUrl || !serviceRoleKey || !clientId || !clientSecret) {
    return new Response(JSON.stringify({ error: "Missing env configuration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const tokenRow = await supabase.from("google_tokens").select("*").eq("user_id", payload.teacherId).maybeSingle();
  if (tokenRow.error || !tokenRow.data) {
    return new Response(JSON.stringify({ error: "Teacher does not have a connected Google account." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  async function refreshAccessToken() {
    const refreshRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: tokenRow.data.refresh_token,
        grant_type: "refresh_token",
      }),
    });
    if (!refreshRes.ok) return null;
    const refreshed = await refreshRes.json();
    const accessToken = refreshed.access_token as string | undefined;
    if (!accessToken) return null;
    const expiresIn = Number(refreshed.expires_in ?? 3600);
    await supabase
      .from("google_tokens")
      .update({ access_token: accessToken, expiry: new Date(Date.now() + expiresIn * 1000).toISOString() })
      .eq("user_id", payload.teacherId);
    return accessToken;
  }

  async function authedFetch(url: string, init: RequestInit) {
    const baseHeaders = init.headers as Record<string, string> | undefined;
    const first = await fetch(url, {
      ...init,
      headers: {
        ...(baseHeaders ?? {}),
        Authorization: `Bearer ${tokenRow.data.access_token}`,
      },
    });
    if (first.status !== 401) return first;
    const refreshed = await refreshAccessToken();
    if (!refreshed) return first;
    return fetch(url, {
      ...init,
      headers: {
        ...(baseHeaders ?? {}),
        Authorization: `Bearer ${refreshed}`,
      },
    });
  }

  const action = payload.action ?? "upsert";
  if (action === "delete") {
    const eventId = payload.calendarEventId;
    if (!eventId) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const deleteRes = await authedFetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!deleteRes.ok && deleteRes.status !== 404) {
      return new Response(JSON.stringify({ error: "Could not delete Google Calendar event." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true, deleted: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!payload.title || !payload.startAt || !payload.durationMinutes) {
    return new Response(JSON.stringify({ error: "Missing session details for upsert." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: dbSession } = await supabase
    .from("sessions")
    .select("calendar_event_id")
    .eq("id", payload.sessionId)
    .maybeSingle();

  const existingEventId = payload.calendarEventId ?? (dbSession?.calendar_event_id as string | null) ?? null;
  const endAt = new Date(new Date(payload.startAt).getTime() + payload.durationMinutes * 60_000).toISOString();
  const requestBody = JSON.stringify({
    summary: payload.title,
    description: payload.description ?? "",
    start: { dateTime: payload.startAt },
    end: { dateTime: endAt },
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  });

  const endpoint = existingEventId
    ? `https://www.googleapis.com/calendar/v3/calendars/primary/events/${existingEventId}?conferenceDataVersion=1`
    : "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1";
  const method = existingEventId ? "PATCH" : "POST";
  const eventRes = await authedFetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: requestBody,
  });

  if (!eventRes.ok) {
    return new Response(JSON.stringify({ error: "Could not upsert Google Calendar event." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const eventJson = await eventRes.json();
  const meetUrl = (eventJson.hangoutLink as string | undefined) ?? null;
  const eventId = (eventJson.id as string | undefined) ?? existingEventId;
  if (eventId) {
    await supabase
      .from("sessions")
      .update({
        meeting_provider: "google_meet",
        meeting_url: meetUrl,
        calendar_event_id: eventId,
      })
      .eq("id", payload.sessionId);
  }

  return new Response(JSON.stringify({ eventId, meetUrl }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
