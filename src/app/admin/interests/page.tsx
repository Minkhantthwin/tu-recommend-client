import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Manage Interests",
};

export default function AdminInterestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Interests"
        description="Add, edit, and manage interest categories"
      />

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Interest management will be implemented here
        </p>
      </div>
    </div>
  );
}
