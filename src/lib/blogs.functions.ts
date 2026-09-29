import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string | null;
  published_date: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

const BLOG_COLUMNS = "id, slug, title, excerpt, content, tag, published_date, image_url, sort_order, is_active";

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

/** Public: active blogs for the storefront. */
export const listBlogs = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("blogs")
    .select(BLOG_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [] as BlogRow[];
  return (data ?? []) as BlogRow[];
});

/** Admin: every blog, including hidden ones. */
export const listAllBlogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("blogs")
      .select(BLOG_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as BlogRow[];
  });

export type BlogInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string | null;
  published_date: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

export const saveBlog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: BlogInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug.trim(),
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      tag: data.tag?.trim() || null,
      published_date: data.published_date.trim(),
      image_url: data.image_url.trim(),
      sort_order: data.sort_order,
      is_active: data.is_active,
    };
    if (data.id) {
      const { error } = await context.supabase.from("blogs").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("blogs").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("blogs").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

export const getBlogBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { data, error } = await publicClient()
      .from("blogs")
      .select(BLOG_COLUMNS)
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data as BlogRow;
  });
