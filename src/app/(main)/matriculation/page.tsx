import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Matriculation Results",
};

export default function MatriculationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Matriculation Results"
        titleMm="တက္ကသိုလ်ဝင်ခွင့်ရမှတ်များ"
        description="View and manage your matriculation exam results"
      />

      {/* Matriculation content placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Matriculation results will be displayed here
        </p>
      </div>
    </div>
  );
}
