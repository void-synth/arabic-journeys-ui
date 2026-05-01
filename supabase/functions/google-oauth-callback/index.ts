import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
  const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI");

  if (!supabaseUrl || !serviceRoleKey || !clientId || !clientSecret || !redirectUri) {
    return new Response("Missing env configuration", { status: 500 });
  }
  if (!code || !state) return new Response("Missing OAuth params", { status: 400 });

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const stateRow = await supabase
    .from("google_oauth_states")
    .select("state,user_id,callback_path,app_url,expires_at")
    .eq("state", state)
    .maybeSingle();
  if (stateRow.error || !stateRow.data) {
    return new Response("Invalid OAuth state", { status: 400 });
  }
  if (new Date(stateRow.data.expires_at).getTime() < Date.now()) {
    await supabase.from("google_oauth_states").delete().eq("state", state);
    return new Response("Expired OAuth state", { status: 400 });
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) {
    return new Response("Token exchange failed", { status: 500 });
  }
  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token as string;
  const refreshToken = (tokenJson.refresh_token as string | undefined) ?? "";
  const scope = (tokenJson.scope as string | undefined) ?? "";
  const tokenType = (tokenJson.token_type as string | undefined) ?? "Bearer";
  const expiresIn = Number(tokenJson.expires_in ?? 3600);

  const profileRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!profileRes.ok) {
    return new Response("Google profile fetch failed", { status: 500 });
  }
  const profileJson = await profileRes.json();
  const googleSub = profileJson.sub as string;
  const email = profileJson.email as string;

  const userId = stateRow.data.user_id;

  await supabase.from("google_accounts").upsert({
    user_id: userId,
    google_sub: googleSub,
    email,
  });
  await supabase.from("google_tokens").upsert({
    user_id: userId,
    access_token: accessToken,
    refresh_token: refreshToken,
    scope,
    token_type: tokenType,
    expiry: new Date(Date.now() + expiresIn * 1000).toISOString(),
  });

  await supabase.from("google_oauth_states").delete().eq("state", state);

  const redirectBack = `${stateRow.data.app_url}${stateRow.data.callback_path}?google=connected`;
  return Response.redirect(redirectBack, 302);
});
