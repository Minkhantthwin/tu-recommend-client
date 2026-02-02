import { PageHeader } from "@/components/shared/page-header";
import { InterestSelectionForm } from "@/components/forms/interest-selection-form";

export const metadata = {
  title: "Interests",
};

export default function InterestsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Interests"
        titleMm="စိတ်ဝင်စားမှုများ"
        description="Select your areas of interest"
      />

      <InterestSelectionForm />
    </div>
  );
}
