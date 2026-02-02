import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInterests,
  getInterest,
  createInterest,
  updateInterest,
  deleteInterest,
} from "@/lib/api/endpoints/admin.api";
import { InterestInput } from "@/types/interest.types";
import { toast } from "sonner";

export function useAdminInterests(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const queryClient = useQueryClient();

  const interestsQuery = useQuery({
    queryKey: ["admin-interests", params],
    queryFn: () => getInterests(params),
  });

  const deleteInterestMutation = useMutation({
    mutationFn: deleteInterest,
    onSuccess: () => {
      toast.success("Interest deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete interest");
    },
  });

  const createInterestMutation = useMutation({
    mutationFn: createInterest,
    onSuccess: () => {
      toast.success("Interest created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create interest");
    },
  });

  const updateInterestMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InterestInput> }) =>
      updateInterest(id, data),
    onSuccess: () => {
      toast.success("Interest updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-interests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-interest"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update interest");
    },
  });

  return {
    interests: interestsQuery.data,
    isLoading: interestsQuery.isLoading,
    isError: interestsQuery.isError,
    error: interestsQuery.error,
    deleteInterest: deleteInterestMutation.mutate,
    createInterest: createInterestMutation.mutate,
    updateInterest: updateInterestMutation.mutate,
    isDeleting: deleteInterestMutation.isPending,
    isCreating: createInterestMutation.isPending,
    isUpdating: updateInterestMutation.isPending,
  };
}

export function useAdminInterest(id: number) {
  return useQuery({
    queryKey: ["admin-interest", id],
    queryFn: () => getInterest(id),
    enabled: !!id && !isNaN(id),
  });
}
