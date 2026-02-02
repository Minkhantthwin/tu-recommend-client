"use client";

import { PageHeader } from "@/components/shared/page-header";
import { InterestForm } from "@/components/admin/interests/interest-form";
import { useAdminInterests } from "@/hooks/use-admin-interests";
import { useRouter } from "next/navigation";
import { InterestInput } from "@/types/interest.types";

export default function CreateInterestPage() {
  const { createInterest, isCreating } = useAdminInterests();
  const router = useRouter();

  const handleCreate = (data: InterestInput) => {
    createInterest(data, {
      onSuccess: () => {
        router.push("/admin/interests");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Interest"
        description="Add a new interest category"
      />
      <InterestForm
        onSubmit={handleCreate}
        isSubmitting={isCreating}
        title="New Interest"
        description="Enter the details for the new interest."
      />
    </div>
  );
}
