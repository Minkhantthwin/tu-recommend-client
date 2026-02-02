"use client";

import { PageHeader } from "@/components/shared/page-header";
import { InterestForm } from "@/components/admin/interests/interest-form";
import { useAdminInterests, useAdminInterest } from "@/hooks/use-admin-interests";
import { useRouter } from "next/navigation";
import { InterestInput } from "@/types/interest.types";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditInterestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const interestId = parseInt(id);
  const { data: interestData, isLoading, error } = useAdminInterest(interestId);
  const interest = interestData?.data;
  const { updateInterest, isUpdating } = useAdminInterests();
  const router = useRouter();

  const handleUpdate = (data: InterestInput) => {
    updateInterest(
      { id: interestId, data },
      {
        onSuccess: () => {
          router.push("/admin/interests");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !interest) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load interest details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Interest"
        description={`Edit details for ${interest.name}`}
      />
      <InterestForm
        interest={interest}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
        title="Edit Interest Information"
        description="Update the details below."
      />
    </div>
  );
}
