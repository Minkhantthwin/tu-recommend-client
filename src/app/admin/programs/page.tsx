"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminPrograms } from "@/hooks/use-admin-programs";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Program } from "@/types/program.types";
import { ProgramStatus } from "@/types/enums";
import { format } from "date-fns";
import { MoreHorizontal, Trash, Loader2, Eye, Copy, Edit, GraduationCap, School } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { PaginationState } from "@tanstack/react-table";

export default function AdminProgramsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { 
    programs, 
    isLoading, 
    error, 
    deleteProgram, 
    isDeleting 
  } = useAdminPrograms({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  
  const router = useRouter();
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<number | null>(null);

  const confirmDeleteProgram = () => {
    if (programToDelete) {
      deleteProgram(programToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setProgramToDelete(null);
        }
      });
    }
  };

  const handleExport = () => {
    if (!programs?.data?.data) return;
    
    const headers = ["ID", "Name", "Code", "University", "Degree", "Status", "Created At"];
    const csvContent = [
      headers.join(","),
      ...programs.data.data.map((prog) => 
        [
          prog.id, 
          `"${prog.name.replace(/"/g, '""')}"`, 
          prog.code || "", 
          `"${prog.university?.name?.replace(/"/g, '""') || ""}"`,
          prog.degree,
          prog.status,
          prog.createdAt
        ].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "programs_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = useMemo<ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <span className="font-medium">{row.getValue("name")}</span>
              {row.original.nameMm && (
                <span className="text-xs text-muted-foreground font-myanmar">
                  {row.original.nameMm}
                </span>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: "university.name",
        header: "University",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <School className="h-3 w-3 text-muted-foreground" />
              <span className="truncate max-w-[200px]" title={row.original.university?.name}>
                {row.original.university?.name || "-"}
              </span>
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
        accessorKey: "degree",
        header: "Degree",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <GraduationCap className="h-3 w-3 text-muted-foreground" />
              <span>{row.getValue("degree")}</span>
            </div>
          );
        }
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as ProgramStatus;
          return (
            <Badge variant={status === ProgramStatus.ACTIVE ? "default" : "secondary"}>
              {status}
            </Badge>
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
          const program = row.original;
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
                  onClick={() => router.push(`/admin/programs/${program.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/programs/${program.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Program
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(program.id.toString())}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                   className="text-red-600 focus:text-red-600"
                   onClick={() => {
                     setProgramToDelete(program.id);
                     setDeleteDialogOpen(true);
                   }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Program
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
        Failed to load programs
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Programs"
        description="Add, edit, and manage programs"
      />

      <div className="rounded-lg border bg-card p-6">
        <DataTable 
          columns={columns} 
          data={programs?.data?.data || []} 
          searchKey="name"
          filterPlaceholder="Filter programs..."
          onAdd={() => router.push("/admin/programs/create")}
          onExport={handleExport}
          pageCount={programs?.data?.pagination?.totalPages || -1}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Program"
        description="Are you sure you want to delete this program? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDeleteProgram}
        isLoading={isDeleting}
      />
    </div>
  );
}
