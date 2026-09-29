import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type UpdateRow = {
  id: string;
  text: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

const UPDATE_COLUMNS = "id, text, sort_order, is_active, created_at";

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

/** Public: active updates for the storefront banner. */
export const listPublicUpdates = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("latest_updates")
    .select(UPDATE_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [] as UpdateRow[];
  return (data ?? []) as UpdateRow[];
});

/** Admin: all updates. */
export const listAllUpdates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("latest_updates")
      .select(UPDATE_COLUMNS)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as UpdateRow[];
  });

export type UpdateInput = {
  id?: string;
  text: string;
  sort_order: number;
  is_active: boolean;
};

export const saveUpdate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UpdateInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      text: data.text.trim(),
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    if (data.id) {
      const { error } = await context.supabase.from("latest_updates").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("latest_updates").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteUpdate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("latest_updates").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
