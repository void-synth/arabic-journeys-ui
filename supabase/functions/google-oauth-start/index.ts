import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
  const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI");
  const appUrl = Deno.env.get("VITE_APP_URL") ?? "http://localhost:5173";
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!googleClientId || !redirectUri || !supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Google OAuth env vars are missing." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const requestUrl = new URL(req.url);
  const payload = await req.json().catch(() => ({} as { callbackPath?: string }));
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "").trim();
  if (!token) {
    return new Response(JSON.stringify({ error: "Missing bearer token." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const me = await supabase.auth.getUser(token);
  const uid = me.data.user?.id;
  if (!uid) {
    return new Response(JSON.stringify({ error: "Invalid auth token." }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const state = crypto.randomUUID();
  const callbackPath = payload.callbackPath ?? requestUrl.searchParams.get("callbackPath") ?? "/teacher/settings";
  const scope = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar.events",
  ].join(" ");

  const authUrl = new URL(GOOGLE_AUTH_URL);
  authUrl.searchParams.set("client_id", googleClientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("scope", scope);
  await supabase.from("google_oauth_states").delete().eq("user_id", uid);
  await supabase.from("google_oauth_states").insert({
    state,
    user_id: uid,
    callback_path: callbackPath,
    app_url: appUrl,
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  });

  authUrl.searchParams.set("state", state);

  return new Response(JSON.stringify({ authUrl: authUrl.toString(), state }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
