import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Manage Universities",
};

export default function AdminUniversitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Universities"
        description="Add, edit, and manage universities"
      />

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          University management table will be implemented here
        </p>
      </div>
    </div>
  );
}
