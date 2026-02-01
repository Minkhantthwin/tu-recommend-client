import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="Manage users, universities, programs, and applications"
      />

      {/* Admin stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Users", value: "-" },
          { label: "Universities", value: "-" },
          { label: "Programs", value: "-" },
          { label: "Applications", value: "-" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Admin quick actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Recent Applications</h3>
          <p className="text-muted-foreground">
            Recent applications for review will be displayed here
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">System Status</h3>
          <p className="text-muted-foreground">
            System status information will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
