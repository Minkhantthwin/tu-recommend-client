"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProgramForm } from "@/components/admin/programs/program-form";
import { useAdminPrograms, useAdminProgram } from "@/hooks/use-admin-programs";
import { useRouter } from "next/navigation";
import { ProgramInput } from "@/types/program.types";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const programId = parseInt(id);
  const { data: programData, isLoading, error } = useAdminProgram(programId);
  const program = programData?.data;
  const { updateProgram, isUpdating } = useAdminPrograms();
  const router = useRouter();

  const handleUpdate = (data: ProgramInput) => {
    updateProgram(
      { id: programId, data },
      {
        onSuccess: () => {
          router.push("/admin/programs");
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

  if (error || !program) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load program details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Program"
        description={`Edit details for ${program.name}`}
      />
      <ProgramForm
        program={program}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
        title="Edit Program Information"
        description="Update the details below."
      />
    </div>
  );
}
