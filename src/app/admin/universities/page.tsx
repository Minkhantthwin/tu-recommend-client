"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminUniversities } from "@/hooks/use-admin-universities";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { University } from "@/types/university.types";
import { format } from "date-fns";
import { MoreHorizontal, Trash, Loader2, Eye, Copy, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function AdminUniversitiesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { 
    universities, 
    isLoading, 
    error, 
    deleteUniversity, 
    isDeleting 
  } = useAdminUniversities({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  
  const router = useRouter();
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState<number | null>(null);

  const confirmDeleteUniversity = () => {
    if (universityToDelete) {
      deleteUniversity(universityToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setUniversityToDelete(null);
        }
      });
    }
  };

  const handleExport = () => {
    if (!universities?.data?.data) return;
    
    const headers = ["ID", "Name", "Code", "Location", "Region", "Created At"];
    const csvContent = [
      headers.join(","),
      ...universities.data.data.map((uni) => 
        [
          uni.id, 
          `"${uni.name.replace(/"/g, '""')}"`, 
          uni.code || "", 
          `"${uni.location.replace(/"/g, '""')}"`, 
          uni.region || "", 
          uni.createdAt
        ].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "universities_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = useMemo<ColumnDef<University>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium">{row.getValue("name")}</span>
              {row.original.nameMyanmar && (
                <span className="text-xs text-muted-foreground font-myanmar">
                  {row.original.nameMyanmar}
                </span>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: ({ row }) => row.getValue("code") || "-",
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          const location = row.getValue("location") as string;
          const region = row.original.region;
          return (
            <div className="flex flex-col max-w-[200px]">
              <span className="truncate" title={location}>{location}</span>
              {region && <span className="text-xs text-muted-foreground">{region}</span>}
            </div>
          );
        }
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const date = row.getValue("createdAt") as string;
          return date ? format(new Date(date), "PPP") : "N/A";
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const university = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/universities/${university.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/universities/${university.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit University
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(university.id.toString())}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                   className="text-red-600 focus:text-red-600"
                   onClick={() => {
                     setUniversityToDelete(university.id);
                     setDeleteDialogOpen(true);
                   }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete University
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router]
  );

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
        Failed to load universities
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Universities"
        description="Add, edit, and manage universities"
      />

      <div className="rounded-lg border bg-card p-6">
        <DataTable 
          columns={columns} 
          data={universities?.data?.data || []} 
          searchKey="name"
          filterPlaceholder="Filter universities..."
          onAdd={() => router.push("/admin/universities/create")}
          onExport={handleExport}
          pageCount={universities?.data?.pagination?.totalPages || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete University"
        description="Are you sure you want to delete this university? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDeleteUniversity}
        isLoading={isDeleting}
      />
    </div>
  );
}
