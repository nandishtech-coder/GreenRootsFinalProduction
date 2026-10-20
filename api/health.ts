import { createClient } from "@supabase/supabase-js";

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return Response.json(
      { ok: false, error: "Method not allowed." },
      { status: 405, headers: { "content-type": "application/json; charset=utf-8" } },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { ok: false, error: "Supabase environment variables are not configured." },
      { status: 503, headers: { "content-type": "application/json; charset=utf-8" } },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase.from("products").select("id").limit(1);

    if (error) {
      console.error("Health check database query failed:", error);
      return Response.json(
        { ok: false, error: error.message },
        { status: 503, headers: { "content-type": "application/json; charset=utf-8" } },
      );
    }

    return Response.json(
      {
        ok: true,
        checkedAt: new Date().toISOString(),
        sampleCount: data?.length ?? 0,
      },
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown health-check error." },
      { status: 503, headers: { "content-type": "application/json; charset=utf-8" } },
    );
  }
}
