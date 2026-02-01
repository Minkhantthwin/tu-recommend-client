import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Applications",
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        titleMm="ကျွန်ုပ်၏လျှောက်လွှာများ"
        description="View and manage your university applications"
      />

      {/* Applications list placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Application list will be displayed here
        </p>
      </div>
    </div>
  );
}
