import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SiteSettings = {
  maintenance_mode: boolean;
  maintenance_heading: string;
  maintenance_message: string;
};

export const getSiteSettings = createServerFn({ method: "GET" })
  .handler(async (): Promise<SiteSettings> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await (supabaseAdmin as any)
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Default fallback if table missing or row missing
      return { maintenance_mode: false, maintenance_heading: "Website Under Maintenance", maintenance_message: "We are currently updating our website. Please check back later." };
    }

    return {
      maintenance_mode: Boolean(data.maintenance_mode),
      maintenance_heading: data.maintenance_heading || "Website Under Maintenance",
      maintenance_message: data.maintenance_message || "We are currently updating our website. Please check back later."
    };
  });

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { maintenance_mode: boolean; maintenance_heading: string; maintenance_message: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: isSuperAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "super_admin" as any,
    });

    if (!isSuperAdmin) {
      throw new Error("Unauthorized: Only super_admins can update site settings");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await (supabaseAdmin as any)
      .from("site_settings")
      .upsert({ id: 1, ...data });

    if (error) throw error;
    return { success: true };
  });
