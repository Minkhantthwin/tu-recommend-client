import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        titleMm="ပရိုဖိုင်"
        description="Manage your personal information"
      />

      {/* Profile content placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Profile management will be implemented here
        </p>
      </div>
    </div>
  );
}
