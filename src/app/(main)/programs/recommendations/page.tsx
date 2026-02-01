import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Recommendations",
};

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Recommendations"
        titleMm="အကြံပြုချက်များ"
        description="AI-powered program recommendations based on your profile"
      />

      {/* Recommendations placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Personalized recommendations will be displayed here
        </p>
      </div>
    </div>
  );
}
