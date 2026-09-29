import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function getPublicSupabase() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined
        );
        if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const listGuidelines = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from("guidelines" as any)
      .select("*")
      .order("title");

    if (error) {
      throw new Error(error.message);
    }
    return data || [];
  });

export const getGuideline = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data: slug }) => {
    const supabase = getPublicSupabase();
    const { data, error } = await supabase
      .from("guidelines" as any)
      .select("*")
      .eq("slug", slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }
    return data || null;
  });

export const updateGuideline = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { id: string; content: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { id, content } = data;
    const { error } = await supabase
      .from("guidelines" as any)
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  });

export const createGuideline = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { slug: string; title: string; content: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { slug, title, content } = data;
    const { error } = await supabase
      .from("guidelines" as any)
      .insert([{ slug, title, content }]);

    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  });
