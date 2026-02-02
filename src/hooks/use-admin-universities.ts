import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUniversities,
  getUniversity,
  getUniversityPrograms,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "@/lib/api/endpoints/admin.api";
import { UniversityInput } from "@/types/university.types";
import { toast } from "sonner";

export function useAdminUniversities(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const queryClient = useQueryClient();

  const universitiesQuery = useQuery({
    queryKey: ["admin-universities", params],
    queryFn: () => getUniversities(params),
    placeholderData: (previousData) => previousData,
  });

  const deleteUniversityMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      toast.success("University deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete university");
    },
  });

  const createUniversityMutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      toast.success("University created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create university");
    },
  });

  const updateUniversityMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<UniversityInput>;
    }) => updateUniversity(id, data),
    onSuccess: () => {
      toast.success("University updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
      // Invalidate specific university query as well
      queryClient.invalidateQueries({ queryKey: ["admin-university"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update university");
    },
  });

  return {
    universities: universitiesQuery.data,
    isLoading: universitiesQuery.isLoading,
    isError: universitiesQuery.isError,
    error: universitiesQuery.error,
    deleteUniversity: deleteUniversityMutation.mutate,
    createUniversity: createUniversityMutation.mutate,
    updateUniversity: updateUniversityMutation.mutate,
    isDeleting: deleteUniversityMutation.isPending,
    isCreating: createUniversityMutation.isPending,
    isUpdating: updateUniversityMutation.isPending,
  };
}

export function useAdminUniversity(id: number) {
  return useQuery({
    queryKey: ["admin-university", id],
    queryFn: () => getUniversity(id),
    enabled: !!id && !isNaN(id),
  });
}

export function useAdminUniversityPrograms(universityId: number) {
  return useQuery({
    queryKey: ["admin-university-programs", universityId],
    queryFn: () => getUniversityPrograms(universityId),
    enabled: !!universityId && !isNaN(universityId),
  });
}
