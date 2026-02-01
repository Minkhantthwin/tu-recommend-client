"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStats } from "@/lib/api/endpoints/admin.api";

interface AdminApplicationStatusChartProps {
  stats: AdminStats;
}

export function AdminApplicationStatusChart({ stats }: AdminApplicationStatusChartProps) {
  const data = [
    { name: "Pending", value: stats.applications.pending, color: "hsl(var(--chart-4))" }, // Yellow/Amber-ish
    { name: "Approved", value: stats.applications.approved, color: "hsl(var(--chart-2))" }, // Teal/Green-ish
    { name: "Rejected", value: stats.applications.rejected, color: "hsl(var(--chart-1))" }, // Red/Orange-ish
  ];

  // Filter out zero values to avoid empty segments/labels if desired, 
  // but Recharts handles 0 okay (just doesn't render).
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
        <CardDescription>
          Current status of submitted applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => (percent && percent > 0) ? `${(percent * 100).toFixed(0)}%` : ""}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
