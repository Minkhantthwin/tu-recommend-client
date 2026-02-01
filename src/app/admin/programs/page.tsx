import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Manage Programs",
};

export default function AdminProgramsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Programs"
        description="Add, edit, and manage programs"
      />

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Program management table will be implemented here
        </p>
      </div>
    </div>
  );
}
