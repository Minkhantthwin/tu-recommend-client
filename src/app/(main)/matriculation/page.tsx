import { PageHeader } from "@/components/shared/page-header";
import { MatriculationForm } from "@/components/forms/matriculation-form";

export const metadata = {
  title: "Matriculation Results",
};

export default function MatriculationPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Matriculation Results"
        titleMm="တက္ကသိုလ်ဝင်ခွင့်ရမှတ်များ"
        description="View and manage your matriculation exam results"
      />

      <MatriculationForm />
    </div>
  );
}
