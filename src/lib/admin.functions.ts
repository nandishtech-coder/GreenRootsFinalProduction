import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    const { data: isSuperAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "super_admin" as any,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!isAdmin && !isSuperAdmin) {
      return { isAdmin: false as const, isSuperAdmin: false as const, enquiries: [], adminEmail: "" };
    }

    const [
      { data: enquiriesData, error: enquiriesError },
      { count: servicesCount },
      { count: categoriesCount },
      { count: productsCount },
      { count: reelsCount },
      { count: blogsCount },
      { count: totalEnquiriesCount },
      { count: resolvedEnquiriesCount },
    ] = await Promise.all([
      supabase.from("enquiries").select("id, name, email, phone, interested_in, message, status, created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("reels").select("*", { count: "exact", head: true }),
      supabase.from("blogs").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "resolved"),
    ]);

    if (enquiriesError) throw enquiriesError;

    return { 
      isAdmin: true as const, 
      isSuperAdmin: !!isSuperAdmin,
      adminEmail: user?.email || "",
      enquiries: enquiriesData ?? [],
      analytics: {
        services: servicesCount ?? 0,
        categories: categoriesCount ?? 0,
        products: productsCount ?? 0,
        reels: reelsCount ?? 0,
        blogs: blogsCount ?? 0,
        enquiriesTotal: totalEnquiriesCount ?? 0,
        enquiriesResolved: resolvedEnquiriesCount ?? 0
      }
    };
  });

/** Bootstrap: the first signed-in account may claim the admin role while no admin exists. */
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw countError;
    if ((count ?? 0) > 0) return { granted: false as const };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw error;
    return { granted: true as const };
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { id: string; status: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });

export const getEnquiriesDailyStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data: { month: string }) => data)
  .handler(async ({ data: { month }, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Parse the YYYY-MM string
    const [year, m] = month.split('-');
    const startDate = new Date(parseInt(year || "0"), parseInt(m || "0") - 1, 1);
    const endDate = new Date(parseInt(year || "0"), parseInt(m || "0"), 0, 23, 59, 59, 999);

    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("created_at")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch enquiries stats", error);
      return [];
    }

    const stats: Record<string, { date: string; enquiries: number }> = {};
    
    data.forEach((row) => {
      const dateObj = new Date(row.created_at);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      
      if (!stats[dateStr]) {
        stats[dateStr] = { date: dateStr, enquiries: 0 };
      }
      stats[dateStr].enquiries++;
    });

    return Object.values(stats);
  });
