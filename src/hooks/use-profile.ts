import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  CreateUserProfileInput,
  UpdateUserProfileInput,
} from "@/lib/api/endpoints/user.api";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  const profileQuery = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not authenticated");
      try {
        return await getUserProfile(userId);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return { data: null }; // Return null profile instead of error
        }
        throw error;
      }
    },
    enabled: !!userId,
    retry: false,
  });

  const createProfileMutation = useMutation({
    mutationFn: (data: CreateUserProfileInput) => {
      if (!userId) throw new Error("User not authenticated");
      return createUserProfile(userId, data);
    },
    onSuccess: () => {
      toast.success("Profile created successfully");
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
    },
    onError: (error: Error | AxiosError) => {
      if (error instanceof AxiosError && error.response?.data) {
        // @ts-ignore
        const message =
          error.response.data.message || "Failed to create profile";
        toast.error(message);
      } else {
        toast.error(error.message || "Failed to create profile");
      }
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateUserProfileInput) => {
      if (!userId) throw new Error("User not authenticated");
      return updateUserProfile(userId, data);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
    },
    onError: (error: Error | AxiosError) => {
      if (error instanceof AxiosError && error.response?.data) {
        // @ts-ignore
        const message =
          error.response.data.message || "Failed to update profile";
        toast.error(message);
      } else {
        toast.error(error.message || "Failed to update profile");
      }
    },
  });

  return {
    profile: profileQuery.data?.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    createProfile: createProfileMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isCreating: createProfileMutation.isPending,
    isUpdating: updateProfileMutation.isPending,
    isSaving:
      createProfileMutation.isPending || updateProfileMutation.isPending,
  };
}
