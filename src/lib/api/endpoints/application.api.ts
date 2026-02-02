import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "@/types/application.types";

export const getMyApplications = async () => {
  const response =
    await apiClient.get<
      ApiResponse<{ applications: Application[]; total: number }>
    >("/applications");
  return response.data;
};

export const createApplication = async (data: CreateApplicationInput) => {
  const response = await apiClient.post<ApiResponse<Application>>(
    "/applications",
    data,
  );
  return response.data;
};

export const updateApplication = async (
  id: string,
  data: UpdateApplicationInput,
) => {
  const response = await apiClient.put<ApiResponse<Application>>(
    `/applications/${id}`,
    data,
  );
  return response.data;
};
