import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyInterests,
  getAllInterests,
  updateMyInterests,
} from "@/lib/api/endpoints/interest.api";
import { toast } from "sonner";

export function useUserInterests() {
  const queryClient = useQueryClient();

  const myInterestsQuery = useQuery({
    queryKey: ["my-interests"],
    queryFn: getMyInterests,
  });

  const allInterestsQuery = useQuery({
    queryKey: ["all-interests"],
    queryFn: getAllInterests,
  });

  const updateInterestsMutation = useMutation({
    mutationFn: updateMyInterests,
    onSuccess: () => {
      toast.success("Interests updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-interests"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update interests");
    },
  });

  return {
    myInterests: myInterestsQuery.data?.data || [],
    allInterests: allInterestsQuery.data?.data?.data || [],
    isLoadingMyInterests: myInterestsQuery.isLoading,
    isLoadingAllInterests: allInterestsQuery.isLoading,
    updateInterests: updateInterestsMutation.mutate,
    isUpdating: updateInterestsMutation.isPending,
  };
}
