import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const { userId } = await req.json().catch(() => ({ userId: undefined }));
  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), {
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
  const tokenRow = await supabase.from("google_tokens").select("*").eq("user_id", userId).maybeSingle();
  if (tokenRow.error || !tokenRow.data?.refresh_token) {
    return new Response(JSON.stringify({ error: "Refresh token not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: tokenRow.data.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Refresh request failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const refreshed = await res.json();
  const accessToken = refreshed.access_token as string;
  const expiresIn = Number(refreshed.expires_in ?? 3600);
  await supabase
    .from("google_tokens")
    .update({
      access_token: accessToken,
      expiry: new Date(Date.now() + expiresIn * 1000).toISOString(),
    })
    .eq("user_id", userId);

  return new Response(JSON.stringify({ accessToken }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
