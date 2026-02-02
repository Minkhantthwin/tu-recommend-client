"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ProgramForm } from "@/components/admin/programs/program-form";
import { useAdminPrograms } from "@/hooks/use-admin-programs";
import { useRouter } from "next/navigation";
import { ProgramInput } from "@/types/program.types";

export default function CreateProgramPage() {
  const { createProgram, isCreating } = useAdminPrograms();
  const router = useRouter();

  const handleCreate = (data: ProgramInput) => {
    createProgram(data, {
      onSuccess: () => {
        router.push("/admin/programs");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Program"
        description="Add a new program to a university."
      />
      <ProgramForm
        onSubmit={handleCreate}
        isSubmitting={isCreating}
        title="Program Information"
        description="Please fill in the details below."
      />
    </div>
  );
}
