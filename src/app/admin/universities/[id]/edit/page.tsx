"use client";

import { PageHeader } from "@/components/shared/page-header";
import { UniversityForm } from "@/components/admin/universities/university-form";
import { useAdminUniversities, useAdminUniversity } from "@/hooks/use-admin-universities";
import { useRouter } from "next/navigation";
import { UniversityInput } from "@/types/university.types";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const universityId = parseInt(id);
  const { data: universityData, isLoading, error } = useAdminUniversity(universityId);
  const university = universityData?.data;
  const { updateUniversity, isUpdating } = useAdminUniversities();
  const router = useRouter();

  const handleUpdate = (data: UniversityInput) => {
    updateUniversity(
      { id: universityId, data },
      {
        onSuccess: () => {
          router.push("/admin/universities");
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

  if (error || !university) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load university details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit University"
        description={`Edit details for ${university.name}`}
      />
      <UniversityForm
        university={university}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
        title="Edit University Information"
        description="Update the details below."
      />
    </div>
  );
}
