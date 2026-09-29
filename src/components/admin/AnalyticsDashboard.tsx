import { 
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, 
  Bar, BarChart, CartesianGrid, Legend, Cell, Pie, PieChart
} from "recharts";
import { 
  CheckCircle2, Inbox, Layers, Leaf, Package, PlaySquare, FileText, TrendingUp, FolderTree 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState, useMemo } from "react";
import { format, subDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getPageViewsDailyStats } from "@/lib/tracking.functions";
import { getEnquiriesDailyStats } from "@/lib/admin.functions";

type AnalyticsData = {
  services: number;
  categories: number;
  products: number;
  reels: number;
  blogs: number;
  enquiriesTotal: number;
  enquiriesResolved: number;
};

export function AnalyticsDashboard({ data, enquiries, adminEmail }: { data: AnalyticsData, enquiries: any[], adminEmail?: string }) {
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));

  const { data: usageStats, isLoading: isUsageLoading } = useQuery({
    queryKey: ["page-views-stats", selectedMonth],
    queryFn: () => getPageViewsDailyStats({ data: { month: selectedMonth } }),
  });

  const { data: enquiriesStats, isLoading: isEnquiriesLoading } = useQuery({
    queryKey: ["enquiries-stats", selectedMonth],
    queryFn: () => getEnquiriesDailyStats({ data: { month: selectedMonth } }),
  });

  // Calculate days in the selected month
  const monthDays = useMemo(() => {
    const [year, m] = selectedMonth.split('-');
    const date = new Date(parseInt(year || "0"), parseInt(m || "0") - 1, 1);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }, [selectedMonth]);

  const displayUsageStats = useMemo(() => {
    return monthDays.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const stat = usageStats?.find(s => s.date === dateStr);
      return {
        date: format(day, 'MMM d'),
        pageViews: stat?.pageViews || 0,
        uniqueVisitors: stat?.uniqueVisitors || 0
      };
    });
  }, [usageStats, monthDays]);

  const trendData = useMemo(() => {
    return monthDays.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const stat = enquiriesStats?.find(s => s.date === dateStr);
      return {
        name: format(day, 'MMM d'),
        enquiries: stat?.enquiries || 0
      };
    });
  }, [enquiriesStats, monthDays]);

  const distributionData = [
    { name: "Services", value: data.services, color: "#10b981" },
    { name: "Products", value: data.products, color: "#f59e0b" },
    { name: "Reels", value: data.reels, color: "#ec4899" },
    { name: "Blogs", value: data.blogs, color: "#3b82f6" },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-display font-bold text-forest">
            Welcome To Admin {adminEmail ? adminEmail.split("@")[0]?.toUpperCase() : ""}
          </h2>
          <p className="text-muted-foreground">Here is what's happening across your platform today.</p>
        </div>
        
        {/* Month Picker */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
          <label htmlFor="month-picker" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            View Analytics For:
          </label>
          <input 
            id="month-picker"
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-sm outline-none border-none bg-transparent font-medium text-forest cursor-pointer"
          />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enquiries</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-full bg-forest/10 text-forest">
              <Inbox className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-forest">{data.enquiriesTotal}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <CheckCircle2 className="size-3 text-emerald-500" />
              {data.enquiriesResolved} resolved
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live Services</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <Leaf className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{data.services}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for customers</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Categories</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <FolderTree className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{data.categories}</div>
            <p className="text-xs text-muted-foreground mt-1">Product categories</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <Package className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{data.products}</div>
            <p className="text-xs text-muted-foreground mt-1">Available across store</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Content Created</CardTitle>
            <div className="flex size-10 items-center justify-center rounded-full bg-pink-500/10 text-pink-500">
              <PlaySquare className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600">{data.reels + data.blogs}</div>
            <p className="text-xs text-muted-foreground mt-1 flex gap-2">
              <span>{data.reels} Reels</span> • <span>{data.blogs} Blogs</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics Section */}
      <div className="grid gap-6">
        <Card className="border-none shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-forest" />
              Website Usage (Page Views & Visitors) - {format(new Date(selectedMonth + "-01T00:00:00"), 'MMMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4 sm:px-6">
            <div className="h-[300px] w-full">
              {isUsageLoading ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">Loading usage stats...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={displayUsageStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dx={-10} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                    <Area type="monotone" dataKey="uniqueVisitors" name="Unique Visitors" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="border-none shadow-[var(--shadow-soft)] md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-forest" />
              Platform Growth (Enquiries) - {format(new Date(selectedMonth + "-01T00:00:00"), 'MMMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4 sm:px-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dx={-10} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="enquiries" name="Enquiries Received" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInteractions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[var(--shadow-soft)] md:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="size-5 text-forest" />
              Content Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pb-8">
            {distributionData.length === 0 ? (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">
                No content added yet.
              </div>
            ) : (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#1f2937', fontWeight: 500 }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value, entry: any) => <span style={{ color: '#374151', fontWeight: 500 }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
