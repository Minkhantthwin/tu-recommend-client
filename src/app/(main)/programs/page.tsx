import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Programs",
};

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        titleMm="ဘာသာရပ်များ"
        description="Browse and search available programs"
      />

      {/* Programs list placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Program list will be displayed here
        </p>
      </div>
    </div>
  );
}
