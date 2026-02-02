"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminStats } from "@/hooks/use-admin-stats";
import { Loader2 } from "lucide-react";
import { AdminOverviewChart } from "@/components/admin/admin-overview-chart";
import { AdminUserDistributionChart } from "@/components/admin/admin-user-distribution-chart";
import { AdminApplicationStatusChart } from "@/components/admin/admin-application-status-chart";
import { AdminInterestChart } from "@/components/admin/admin-interest-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load dashboard statistics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Manage users, universities, programs, and applications"
      />

      {/* Admin stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Users", value: stats?.users.total ?? 0 },
          { label: "Universities", value: stats?.universities.total ?? 0 },
          { label: "Programs", value: stats?.programs.total ?? 0 },
          { label: "Applications", value: stats?.applications.total ?? 0 },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {stats && <AdminOverviewChart stats={stats} />}
        {stats && <AdminUserDistributionChart stats={stats} />}
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {stats && <AdminApplicationStatusChart stats={stats} />}
        {stats && <AdminInterestChart stats={stats} />}
        
        <Card className="col-span-4 lg:col-span-1 hidden">
          {/* Hidden or moved System Status card to fit layout better if needed, 
              or we can put it in a 3rd row. 
              Let's put Interest Chart (col-span-3) next to Application Chart (col-span-4).
              Wait, Application chart is usually col-span-3 or 4?
              Let's check layout. Row 1: Overview (4) + User Dist (3) = 7.
              Row 2: Application (3) + Interest (4) = 7? Or similar.
          */}
        </Card>
      </div>

      {/* System Status Row */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of system components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">API Status</p>
                  <p className="text-sm text-muted-foreground">
                    Backend API connectivity
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Database</p>
                  <p className="text-sm text-muted-foreground">
                    PostgreSQL connection
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">System Version</p>
                  <p className="text-sm text-muted-foreground">
                    Current deployment version
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">v0.1.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
