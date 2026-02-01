import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        titleMm="ဒတ်ရှ်ဘုတ်"
        description="Welcome to your dashboard"
      />

      {/* Dashboard content placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="mt-2 h-8 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold mb-4">Recent Applications</h3>
          <p className="text-muted-foreground">
            Application list will be displayed here
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold mb-4">Profile Completion</h3>
          <p className="text-muted-foreground">
            Profile completion status will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
