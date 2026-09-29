import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type CategoryContentRow = {
  id: string;
  description: string | null;
  gallery: string[] | null;
  created_at: string;
  updated_at: string;
};

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

export const getCategoryContent = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("category_content")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Record not found
      return null;
    }
    throw new Error(error.message);
  }

  return {
    ...data,
    gallery: data.gallery as string[] | null,
  } as CategoryContentRow;
});

export const saveCategoryContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: Partial<CategoryContentRow>) => data)
  .handler(async ({ data, context }) => {
    const supabase = context.supabase;
    
    if (!data.id) throw new Error("Category ID is required");

    const { error } = await supabase
      .from("category_content")
      .upsert({
        id: data.id,
        description: data.description ?? null,
        gallery: data.gallery as unknown as any,
        updated_at: new Date().toISOString(),
      });

    if (error) throw new Error(error.message);
    return { success: true };
});
