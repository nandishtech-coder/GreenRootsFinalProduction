import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { Database } from "@/integrations/supabase/types";

export type ReelRow = Database["public"]["Tables"]["reels"]["Row"];

const REEL_COLUMNS = "id, title, src, poster, is_active, sort_order, created_at, updated_at";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public: active reels */
export const listReels = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("reels")
    .select(REEL_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Supabase listReels error:", error);
    return [] as ReelRow[];
  }
  return (data ?? []) as ReelRow[];
});

/** Admin: all reels */
export const listAllReels = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("reels")
      .select(REEL_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ReelRow[];
  });

export type ReelInput = {
  id?: string;
  title: string;
  src: string;
  poster: string;
  is_active: boolean;
  sort_order: number;
};

export const saveReel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: ReelInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      title: data.title.trim(),
      src: data.src.trim(),
      poster: data.poster.trim(),
      is_active: data.is_active,
      sort_order: data.sort_order,
      updated_at: new Date().toISOString(),
    };
    if (data.id) {
      const { error } = await context.supabase.from("reels").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("reels").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteReel = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("reels").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
