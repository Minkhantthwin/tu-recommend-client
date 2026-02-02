import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "@/lib/api/endpoints/admin.api";
import { RegisterInput } from "@/types/user.types";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if ("response" in error) {
      const response = (
        error as { response?: { data?: { error?: string; message?: string } } }
      ).response;
      const apiMessage = response?.data?.error ?? response?.data?.message;
      if (apiMessage) {
        return apiMessage;
      }
    }
  }

  return fallback;
};

export function useAdminUsers() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const usersQuery = useQuery({
    queryKey: ["admin-users", { page, limit, search: debouncedSearch }],
    queryFn: () => getUsers({ page, limit, search: debouncedSearch }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete user"));
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create user"));
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RegisterInput> }) =>
      updateUser(id, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update user"));
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    deleteUser: deleteUserMutation.mutate,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
  };
}
