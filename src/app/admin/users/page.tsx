"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { RegisterInput, User } from "@/types/user.types";
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
import { UserForm, type UserFormValues } from "@/components/admin/users/user-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function AdminUsersPage() {
  const { 
    users, 
    isLoading, 
    error, 
    deleteUser, 
    createUser, 
    updateUser, 
    isCreating, 
    isUpdating, 
    isDeleting,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch
  } = useAdminUsers();
  const router = useRouter();
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleCreateUser = async (data: UserFormValues) => {
    if (!data.password) return;
    const payload: RegisterInput = {
      email: data.email,
      password: data.password,
      role: data.role,
    };
    createUser(payload, {
      onSuccess: () => {
         setIsUserFormOpen(false);
         setEditingUser(null);
      }
    });
  };

  const handleUpdateUser = async (data: UserFormValues) => {
    if (!editingUser) return;
    
    // Only send password if it's not empty
    const updateData: Partial<RegisterInput> = {
      email: data.email,
      role: data.role,
      password: data.password || undefined,
    };
    
    updateUser({ id: editingUser.id, data: updateData }, {
      onSuccess: () => {
         setIsUserFormOpen(false);
         setEditingUser(null);
      }
    });
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }
      });
    }
  };

  const handleExport = () => {
    if (!users?.data?.data) return;
    
    const headers = ["ID", "Email", "Role", "Created At"];
    const csvContent = [
      headers.join(","),
      ...users.data.data.map((user) => 
        [user.id, user.email, user.role, user.createdAt].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          const displayRole = role ? role.toUpperCase() : "USER";
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                displayRole === "ADMIN"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {displayRole}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => {
          const date = row.getValue("createdAt") as string;
          return date ? format(new Date(date), "PPP") : "N/A";
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
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
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEditingUser(user);
                    setIsUserFormOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy User ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                   className="text-red-600 focus:text-red-600"
                   onClick={() => {
                     setUserToDelete(user.id);
                     setDeleteDialogOpen(true);
                   }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete User
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
        Failed to load users
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Users"
        description="View and manage user accounts"
      />

      <div className="rounded-lg border bg-card p-6">
        <DataTable 
          columns={columns} 
          data={users?.data?.data || []} 
          searchKey="email"
          searchValue={search}
          onSearchChange={setSearch}
          filterPlaceholder="Filter emails..."
          onAdd={() => {
            setEditingUser(null);
            setIsUserFormOpen(true);
          }}
          onExport={handleExport}
          pageCount={users?.data?.pagination?.totalPages || 0}
          pagination={{
            pageIndex: page - 1,
            pageSize: limit,
          }}
          onPaginationChange={(updater) => {
            if (typeof updater === 'function') {
              const newState = updater({
                pageIndex: page - 1,
                pageSize: limit,
              });
              setPage(newState.pageIndex + 1);
              setLimit(newState.pageSize);
            } else {
              setPage(updater.pageIndex + 1);
              setLimit(updater.pageSize);
            }
          }}
        />
      </div>

      <UserForm
        open={isUserFormOpen}
        onOpenChange={setIsUserFormOpen}
        user={editingUser}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        isSubmitting={isCreating || isUpdating}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={confirmDeleteUser}
        isLoading={isDeleting}
      />
    </div>
  );
}
