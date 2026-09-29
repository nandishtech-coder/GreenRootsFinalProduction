import { createServerFn } from "@tanstack/react-start";

export const trackPageView = createServerFn({ method: "POST" })
  .validator((data: { path: string; visitorId: string }) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Silently log page view
    await supabaseAdmin.from("page_views" as any).insert({
      path: data.path,
      visitor_id: data.visitorId
    });
    return { ok: true };
  });

export const getPageViewsDailyStats = createServerFn({ method: "GET" })
  .validator((data: { month: string }) => data)
  .handler(async ({ data: { month } }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Parse the YYYY-MM string
    const [year, m] = month.split('-');
    const startDate = new Date(parseInt(year || "0"), parseInt(m || "0") - 1, 1);
    const endDate = new Date(parseInt(year || "0"), parseInt(m || "0"), 0, 23, 59, 59, 999);

    const { data, error } = await supabaseAdmin
      .from("page_views" as any)
      .select("created_at, visitor_id")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch page views stats", error);
      return [];
    }

    // Process data to group by date
    const stats: Record<string, { date: string; pageViews: number; uniqueVisitors: Set<string> }> = {};
    
    data.forEach((row: any) => {
      const dateObj = new Date(row.created_at);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      
      if (!stats[dateStr]) {
        stats[dateStr] = { date: dateStr, pageViews: 0, uniqueVisitors: new Set() };
      }
      stats[dateStr].pageViews++;
      stats[dateStr].uniqueVisitors.add(row.visitor_id);
    });

    const result = Object.values(stats).map(stat => ({
      date: stat.date,
      pageViews: stat.pageViews,
      uniqueVisitors: stat.uniqueVisitors.size
    }));

    return result;
  });
