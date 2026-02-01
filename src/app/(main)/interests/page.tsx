import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Interests",
};

export default function InterestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Interests"
        titleMm="စိတ်ဝင်စားမှုများ"
        description="Select your areas of interest"
      />

      {/* Interests content placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Interest selection will be implemented here
        </p>
      </div>
    </div>
  );
}
