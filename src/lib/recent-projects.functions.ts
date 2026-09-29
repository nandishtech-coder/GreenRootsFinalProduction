import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type RecentProjectRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

const PROJECT_COLUMNS = "id, title, description, image_url, status, sort_order, is_active, created_at";

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

/** Public: active projects for the storefront. */
export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("recent_projects" as any)
    .select(PROJECT_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [] as RecentProjectRow[];
  return (data ?? []) as unknown as RecentProjectRow[];
});

/** Admin: every project, including hidden ones. */
export const listAllProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("recent_projects" as any)
      .select(PROJECT_COLUMNS)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as RecentProjectRow[];
  });

export type ProjectInput = {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  sort_order: number;
  is_active: boolean;
};

export const saveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProjectInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      title: data.title.trim(),
      description: data.description.trim(),
      image_url: data.image_url.trim(),
      status: data.status.trim(),
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    if (data.id) {
      const { error } = await context.supabase.from("recent_projects" as any).update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("recent_projects" as any).insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("recent_projects" as any).delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
