import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type CategoryRow = {
  id: string;
  name: string;
  is_active: boolean;
  sort_order: number;
};

export type ProductRow = {
  id: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  variant_label: string | null;
  variants: string[];
  tags: string[];
  badge: string | null;
  description: string | null;
  material_type: string | null;
  weight: string | null;
  customer_support: string | null;
  is_active: boolean;
};

const CATEGORY_COLUMNS = "id, name, is_active, sort_order";
const PRODUCT_COLUMNS =
  "id, title, image, price, mrp, rating, reviews, variant_label, variants, tags, badge, description, material_type, weight, customer_support, is_active";

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

/** Public: active categories */
export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("categories")
    .select(CATEGORY_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [] as CategoryRow[];
  return (data ?? []) as CategoryRow[];
});

/** Admin: all categories */
export const listAllCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("categories")
      .select(CATEGORY_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as CategoryRow[];
  });

export type CategoryInput = {
  id?: string;
  name: string;
  is_active: boolean;
  sort_order: number;
};

export const saveCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: CategoryInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      name: data.name.trim(),
      is_active: data.is_active,
      sort_order: data.sort_order,
    };
    if (data.id) {
      const { error } = await context.supabase.from("categories").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("categories").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("categories").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

/** Public: active products */
export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase listProducts error:", error);
    return [] as ProductRow[];
  }
  return (data ?? []) as ProductRow[];
});

/** Admin: all products */
export const listAllProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ProductRow[];
  });

export type ProductInput = {
  id?: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  variant_label: string | null;
  variants: string[];
  tags: string[];
  badge: string | null;
  description: string | null;
  material_type: string | null;
  weight: string | null;
  customer_support: string | null;
  is_active: boolean;
};

export const saveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProductInput) => data)
  .handler(async ({ data, context }) => {
    const payload = {
      title: data.title.trim(),
      image: data.image.trim(),
      price: data.price,
      mrp: data.mrp,
      rating: data.rating,
      reviews: data.reviews,
      variant_label: data.variant_label?.trim() || null,
      variants: data.variants.map((v) => v.trim()).filter(Boolean),
      tags: data.tags.map((t) => t.trim()).filter(Boolean),
      badge: data.badge?.trim() || null,
      description: data.description?.trim() || null,
      material_type: data.material_type?.trim() || null,
      weight: data.weight?.trim() || null,
      customer_support: data.customer_support?.trim() || null,
      is_active: data.is_active,
    };
    if (data.id) {
      const { error } = await context.supabase.from("products").update(payload).eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await context.supabase.from("products").insert(payload);
      if (error) throw error;
    }
    return { ok: true as const };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
