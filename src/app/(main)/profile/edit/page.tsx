"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProfileForm } from "@/components/forms/profile-form";

export default function EditProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Edit Profile"
        titleMm="ပရိုဖိုင်ပြင်ဆင်ရန်"
        description="Update your personal information"
      />

      <ProfileForm />
    </div>
  );
}
