"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { useAdminInterests } from "@/hooks/use-admin-interests";
import { getInterestColumns } from "@/components/admin/interests/interest-columns";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Interest } from "@/types/interest.types";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export default function AdminInterestsPage() {
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { interests, isLoading, deleteInterest, isDeleting, error } = useAdminInterests({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const [interestToDelete, setInterestToDelete] = useState<Interest | null>(null);

  const handleDelete = () => {
    if (interestToDelete) {
      deleteInterest(interestToDelete.id, {
        onSuccess: () => setInterestToDelete(null),
      });
    }
  };

  const columns = useMemo(
    () =>
      getInterestColumns({
        onDelete: setInterestToDelete,
      }),
    []
  );

  const handleExport = () => {
    if (!interests?.data?.data) return;

    const headers = ["ID", "Name", "Users", "Created At"];
    const csvContent = [
      headers.join(","),
      ...interests.data.data.map((interest) =>
        [
          interest.id,
          `"${interest.name.replace(/"/g, '""')}"`,
          interest._count?.users || 0,
          interest.createdAt,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "interests_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Failed to load interests
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Interests"
        description="Add, edit, and manage interest categories"
      />

      <div className="rounded-lg border bg-card p-6">
        <DataTable
          columns={columns}
          data={interests?.data?.data || []}
          searchKey="name"
          filterPlaceholder="Filter interests..."
          onAdd={() => router.push("/admin/interests/create")}
          onExport={handleExport}
          pageCount={interests?.data?.pagination?.totalPages || -1}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>

      <ConfirmDialog
        open={!!interestToDelete}
        onOpenChange={(open) => !open && setInterestToDelete(null)}
        title="Delete Interest"
        description={`Are you sure you want to delete "${interestToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
