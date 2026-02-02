import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import {
  RecommendationResponse,
  RecommendationParams,
} from "@/types/recommendation.types";

export const getEligiblePrograms = async (params?: {
  region?: string;
  search?: string;
  universityId?: number;
  page?: number;
  limit?: number;
}) => {
  const response = await apiClient.get<ApiResponse<any>>(
    "/recommendations/eligible",
    {
      params,
    },
  );
  return response.data;
};

export const getTopPrograms = async (params?: RecommendationParams) => {
  const response = await apiClient.get<ApiResponse<RecommendationResponse>>(
    "/recommendations/top",
    {
      params,
    },
  );
  return response.data;
};

export const getSuggestedPrograms = async (params?: RecommendationParams) => {
  const response = await apiClient.get<ApiResponse<RecommendationResponse>>(
    "/recommendations/suggested",
    {
      params: {
        limit: 9,
      },
    },
  );
  return response.data;
};
