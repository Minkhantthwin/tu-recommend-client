"use client";

import { PageHeader } from "@/components/shared/page-header";
import { UniversityForm } from "@/components/admin/universities/university-form";
import { useAdminUniversities } from "@/hooks/use-admin-universities";
import { useRouter } from "next/navigation";
import { UniversityInput } from "@/types/university.types";

export default function CreateUniversityPage() {
  const { createUniversity, isCreating } = useAdminUniversities();
  const router = useRouter();

  const handleCreate = (data: UniversityInput) => {
    createUniversity(data, {
      onSuccess: () => {
        router.push("/admin/universities");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create University"
        description="Add a new university to the system."
      />
      <UniversityForm
        onSubmit={handleCreate}
        isSubmitting={isCreating}
        title="University Information"
        description="Please fill in the details below."
      />
    </div>
  );
}
