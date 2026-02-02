"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useProfile } from "@/hooks/use-profile";
import { ProfileView } from "@/components/profile/profile-view";
import { ProfileForm } from "@/components/forms/profile-form";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Profile"
          titleMm="ပရိုဖိုင်"
          description="Manage your personal information"
        />
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium text-destructive">Failed to load profile</h3>
          <p className="text-muted-foreground mt-2">
             Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Create Profile"
          titleMm="ပရိုဖိုင် ဖန်တီးရန်"
          description="Please fill in your personal information to continue"
        />
        <ProfileForm />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Profile"
        titleMm="ပရိုဖိုင်"
        description="Manage your personal information"
      />

      <ProfileView profile={profile} />
    </div>
  );
}
