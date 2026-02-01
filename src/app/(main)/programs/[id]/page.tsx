import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Program Details",
};

export default function ProgramDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Program Details"
        titleMm="ဘာသာရပ်အသေးစိတ်"
        description="View program information and requirements"
      />

      {/* Program detail placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Program details for ID: {params.id} will be displayed here
        </p>
      </div>
    </div>
  );
}
