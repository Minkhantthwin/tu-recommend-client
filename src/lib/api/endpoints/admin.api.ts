import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { User, RegisterInput } from "@/types/user.types";
import { University } from "@/types/university.types";
import { Program } from "@/types/program.types";

/**
 * Admin Stats Interface
 */
export interface AdminStats {
  users: {
    total: number;
    admins: number;
    users: number;
    recent: number; // last 30 days
  };
  universities: {
    total: number;
    active: number;
  };
  programs: {
    total: number;
    active: number;
  };
  applications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

// Admin API endpoints
export const getAdminStats = async (): Promise<ApiResponse<AdminStats>> => {
  const response = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
  return response.data;
};

// User Management Endpoints
export const getUsers = async () => {
  const response = await apiClient.get<ApiResponse<User[]>>("/users");
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: RegisterInput) => {
  const response = await apiClient.post<ApiResponse<User>>("/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: Partial<RegisterInput>) => {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<void>>(`/users/${id}`);
  return response.data;
};

export const getUniversities = async () => {
  return apiClient.get<ApiResponse<University[]>>("/universities");
};

export const getPrograms = async () => {
  return apiClient.get<ApiResponse<Program[]>>("/programs");
};
