import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { University } from "@/types/university.types";
import { Program } from "@/types/program.types";
import { PaginatedResult } from "./admin.api"; // Reusing PaginatedResult type

export const getUniversities = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
}) => {
  const response = await apiClient.get<
    ApiResponse<PaginatedResult<University>>
  >("/universities", { params });
  return response.data;
};

export const getUniversity = async (id: number) => {
  const response = await apiClient.get<ApiResponse<University>>(
    `/universities/${id}`,
  );
  return response.data;
};

export const getPrograms = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  universityId?: number;
  minScore?: number;
  maxScore?: number;
  region?: string;
}) => {
  const response = await apiClient.get<ApiResponse<PaginatedResult<Program>>>(
    "/programs",
    { params },
  );
  return response.data;
};

export const getProgram = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Program>>(`/programs/${id}`);
  return response.data;
};
