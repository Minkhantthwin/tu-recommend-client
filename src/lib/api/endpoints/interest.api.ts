import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { Interest } from "@/types/interest.types";

export const getMyInterests = async () => {
  const response =
    await apiClient.get<ApiResponse<Interest[]>>("/me/interests");
  return response.data;
};

export const getAllInterests = async () => {
  const response = await apiClient.get<
    ApiResponse<{ data: Interest[]; pagination: any }>
  >("/interests", {
    params: {
      limit: 30, // Fetch all interests (assuming < 100 for now)
    },
  });
  return response.data;
};

export const updateMyInterests = async (interestIds: number[]) => {
  const response = await apiClient.put<ApiResponse<Interest[]>>(
    "/me/interests",
    {
      interestIds,
    },
  );
  return response.data;
};
