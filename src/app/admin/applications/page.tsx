import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Review Applications",
};

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Applications"
        description="Review and process user applications"
      />

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Application review table will be implemented here
        </p>
      </div>
    </div>
  );
}
