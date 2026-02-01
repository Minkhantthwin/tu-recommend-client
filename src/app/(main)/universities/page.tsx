import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Universities",
};

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Universities"
        titleMm="တက္ကသိုလ်များ"
        description="Browse all available universities"
      />

      {/* Universities list placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          University list will be displayed here
        </p>
      </div>
    </div>
  );
}
