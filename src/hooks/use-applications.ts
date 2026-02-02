import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  getMyApplications,
  updateApplication,
} from "@/lib/api/endpoints/application.api";
import { UpdateApplicationInput } from "@/types/application.types";
import { toast } from "sonner";

export function useApplications(options?: { enabled?: boolean }) {
  const queryClient = useQueryClient();

  const myApplicationsQuery = useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
    enabled: options?.enabled !== false,
  });

  const createApplicationMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      toast.success("Application created successfully");
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create application");
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApplicationInput }) =>
      updateApplication(id, data),
    onSuccess: () => {
      toast.success("Application updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update application");
    },
  });

  return {
    applications: myApplicationsQuery.data?.data?.applications || [],
    total: myApplicationsQuery.data?.data?.total || 0,
    isLoading: myApplicationsQuery.isLoading,
    createApplication: createApplicationMutation.mutate,
    updateApplication: updateApplicationMutation.mutate,
    isCreating: createApplicationMutation.isPending,
    isUpdating: updateApplicationMutation.isPending,
  };
}
