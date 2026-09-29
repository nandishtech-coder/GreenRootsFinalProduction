import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  about: string;
  includes: string[];
  cta_heading: string;
  cta_note: string;
  footnote: string;
};

const SERVICE_COLUMNS =
  "id, slug, title, description, image_url, icon, sort_order, is_active, about, includes, cta_heading, cta_note, footnote";

export type WorkforcePageRow = ServiceRow & {
  gallery_urls: string;
};

const WORKFORCE_COLUMNS =
  "id, slug, title, description, image_url, gallery_urls, icon, sort_order, is_active, about, includes, cta_heading, cta_note, footnote";

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

/** Public: active services for the storefront. */
export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("services")
    .select(SERVICE_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [] as ServiceRow[];
  return (data ?? []) as ServiceRow[];
});

export const listPublicWorkforcePages = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("workforce_pages" as any)
    .select(WORKFORCE_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [] as WorkforcePageRow[];
  return (data ?? []) as unknown as WorkforcePageRow[];
});

/** Admin: every service, including hidden ones. */
export const listAllServices = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("services")
      .select(SERVICE_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ServiceRow[];
  });

export type ServiceInput = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  about: string;
  includes: string[];
  cta_heading: string;
  cta_note: string;
  footnote: string;
};

export const saveService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ServiceInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      image_url: data.image_url.trim(),
      icon: data.icon.trim() || "Leaf",
      sort_order: data.sort_order,
      is_active: data.is_active,
      about: data.about.trim(),
      includes: data.includes.map((i) => i.trim()).filter(Boolean),
      cta_heading: data.cta_heading.trim() || "Book a Consultation",
      cta_note: data.cta_note.trim(),
      footnote: data.footnote.trim(),
    };
    if (data.id) {
      const { error } = await context.supabase.from("services").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("services").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteService = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("services").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

export const listAllWorkforcePages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("workforce_pages" as any)
      .select(WORKFORCE_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as unknown as WorkforcePageRow[];
  });

export type WorkforcePageInput = ServiceInput & {
  gallery_urls: string;
};

export const saveWorkforcePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: WorkforcePageInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      image_url: data.image_url.trim(),
      gallery_urls: data.gallery_urls,
      icon: data.icon.trim() || "Leaf",
      sort_order: data.sort_order,
      is_active: data.is_active,
      about: data.about.trim(),
      includes: data.includes.map((i) => i.trim()).filter(Boolean),
      cta_heading: data.cta_heading.trim() || "Book a Consultation",
      cta_note: data.cta_note.trim(),
      footnote: data.footnote.trim(),
    };
    if (data.id) {
      const { error } = await context.supabase.from("workforce_pages" as any).update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("workforce_pages" as any).insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteWorkforcePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("workforce_pages" as any).delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
