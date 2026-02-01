"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStats } from "@/lib/api/endpoints/admin.api";

interface AdminUserDistributionChartProps {
  stats: AdminStats;
}

export function AdminUserDistributionChart({ stats }: AdminUserDistributionChartProps) {
  const data = [
    { name: "Admins", value: stats.users.admins, color: "hsl(var(--chart-1))" },
    { name: "Regular Users", value: stats.users.users, color: "hsl(var(--chart-2))" },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>
          Distribution of user roles in the system.
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
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
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
