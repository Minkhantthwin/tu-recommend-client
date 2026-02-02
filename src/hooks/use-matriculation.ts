import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getMyMatriculation,
  createMyMatriculation,
  updateMyMatriculation,
  CreateMatriculationInput,
  UpdateMatriculationInput,
} from "@/lib/api/endpoints/matriculation.api";
import { toast } from "sonner";

export function useMatriculation() {
  const queryClient = useQueryClient();

  const matriculationQuery = useQuery({
    queryKey: ["my-matriculation"],
    queryFn: getMyMatriculation,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createMyMatriculation,
    onSuccess: () => {
      toast.success("Matriculation results saved successfully");
      queryClient.invalidateQueries({ queryKey: ["my-matriculation"] });
    },
    onError: (error: Error | AxiosError) => {
      if (error instanceof AxiosError && error.response?.data) {
        // @ts-ignore - Assuming standard error format
        const message =
          error.response.data.message || "Failed to save matriculation results";
        toast.error(message);
      } else {
        toast.error(error.message || "Failed to save matriculation results");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMyMatriculation,
    onSuccess: () => {
      toast.success("Matriculation results updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-matriculation"] });
    },
    onError: (error: Error | AxiosError) => {
      if (error instanceof AxiosError && error.response?.data) {
        // @ts-ignore - Assuming standard error format
        const message =
          error.response.data.message ||
          "Failed to update matriculation results";
        toast.error(message);
      } else {
        toast.error(error.message || "Failed to update matriculation results");
      }
    },
  });

  return {
    matriculation: matriculationQuery.data?.data,
    isLoading: matriculationQuery.isLoading,
    createMatriculation: createMutation.mutate,
    updateMatriculation: updateMutation.mutate,
    isSaving: createMutation.isPending || updateMutation.isPending,
  };
}
