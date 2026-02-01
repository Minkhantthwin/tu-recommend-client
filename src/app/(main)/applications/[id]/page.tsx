import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Application Details",
};

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Details"
        titleMm="လျှောက်လွှာအသေးစိတ်"
        description="View application status and details"
      />

      {/* Application detail placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Application details for ID: {params.id} will be displayed here
        </p>
      </div>
    </div>
  );
}
