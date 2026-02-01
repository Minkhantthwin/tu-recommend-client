import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "New Application",
};

export default function NewApplicationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Application"
        titleMm="လျှောက်လွှာအသစ်"
        description="Create a new university application"
      />

      {/* New application form placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Application form will be implemented here
        </p>
      </div>
    </div>
  );
}
