import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "University Details",
};

export default function UniversityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="University Details"
        titleMm="တက္ကသိုလ်အသေးစိတ်"
        description="View university information and programs"
      />

      {/* University detail placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          University details for ID: {params.id} will be displayed here
        </p>
      </div>
    </div>
  );
}
