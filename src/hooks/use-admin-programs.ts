import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "@/lib/api/endpoints/admin.api";
import { ProgramInput } from "@/types/program.types";
import { toast } from "sonner";

export function useAdminPrograms(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const queryClient = useQueryClient();

  const programsQuery = useQuery({
    queryKey: ["admin-programs", params],
    queryFn: () => getPrograms(params),
  });

  const deleteProgramMutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      toast.success("Program deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete program");
    },
  });

  const createProgramMutation = useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      toast.success("Program created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create program");
    },
  });

  const updateProgramMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProgramInput> }) =>
      updateProgram(id, data),
    onSuccess: () => {
      toast.success("Program updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
      // Invalidate specific program query as well
      queryClient.invalidateQueries({ queryKey: ["admin-program"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update program");
    },
  });

  return {
    programs: programsQuery.data,
    isLoading: programsQuery.isLoading,
    isError: programsQuery.isError,
    error: programsQuery.error,
    deleteProgram: deleteProgramMutation.mutate,
    createProgram: createProgramMutation.mutate,
    updateProgram: updateProgramMutation.mutate,
    isDeleting: deleteProgramMutation.isPending,
    isCreating: createProgramMutation.isPending,
    isUpdating: updateProgramMutation.isPending,
  };
}

export function useAdminProgram(id: number) {
  return useQuery({
    queryKey: ["admin-program", id],
    queryFn: () => getProgram(id),
    enabled: !!id && !isNaN(id),
  });
}
