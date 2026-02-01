import { PageHeader } from "@/components/shared/page-header";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        titleMm="ဆက်တင်များ"
        description="Manage your account settings"
      />

      {/* Settings content placeholder */}
      <div className="rounded-lg border p-6">
        <p className="text-muted-foreground">
          Settings options will be implemented here
        </p>
      </div>
    </div>
  );
}
