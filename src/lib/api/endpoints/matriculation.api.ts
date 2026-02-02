import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { MatriculationResult } from "@/types/matriculation.types";

export interface CreateMatriculationInput {
  examYear: number;
  rollNumber: string;
  schoolName: string;
  schoolTownship: string;
  schoolRegion: string;
  myanmar: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology?: number;
}

export interface UpdateMatriculationInput extends Partial<CreateMatriculationInput> {}

export const getMyMatriculation = async () => {
  const response =
    await apiClient.get<ApiResponse<MatriculationResult>>("/me/matriculation");
  return response.data;
};

export const createMyMatriculation = async (data: CreateMatriculationInput) => {
  const response = await apiClient.post<ApiResponse<MatriculationResult>>(
    "/me/matriculation",
    data,
  );
  return response.data;
};

export const updateMyMatriculation = async (data: UpdateMatriculationInput) => {
  const response = await apiClient.put<ApiResponse<MatriculationResult>>(
    "/me/matriculation",
    data,
  );
  return response.data;
};
