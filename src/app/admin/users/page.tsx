import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Manage Users",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Users"
        description="View and manage user accounts"
      />

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          User management table will be implemented here
        </p>
      </div>
    </div>
  );
}
