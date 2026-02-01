"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStats } from "@/lib/api/endpoints/admin.api";

interface AdminOverviewChartProps {
  stats: AdminStats;
}

export function AdminOverviewChart({ stats }: AdminOverviewChartProps) {
  const data = [
    {
      name: "Users",
      total: stats.users.total,
      active: stats.users.users, // Assuming regular users are "active" for this context or just showing breakdown
      admin: stats.users.admins,
    },
    {
      name: "Universities",
      total: stats.universities.total,
      active: stats.universities.active,
      inactive: stats.universities.total - stats.universities.active,
    },
    {
      name: "Programs",
      total: stats.programs.total,
      active: stats.programs.active,
      inactive: stats.programs.total - stats.programs.active,
    },
    {
      name: "Applications",
      total: stats.applications.total,
      pending: stats.applications.pending,
      approved: stats.applications.approved,
    },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
        <CardDescription>
          Overview of system statistics across all modules.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="active" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
