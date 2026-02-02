import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { User, RegisterInput } from "@/types/user.types";
import { University, UniversityInput } from "@/types/university.types";
import { Program, ProgramInput } from "@/types/program.types";
import { Interest, InterestInput } from "@/types/interest.types";

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
  interests: {
    name: string;
    count: number;
  }[];
}

// Admin API endpoints
export const getAdminStats = async (): Promise<ApiResponse<AdminStats>> => {
  const response = await apiClient.get<ApiResponse<AdminStats>>("/admin/stats");
  return response.data;
};

// User Management Endpoints
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}) => {
  const response = await apiClient.get<ApiResponse<PaginatedResult<User>>>(
    "/users",
    { params },
  );
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

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

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

export const createUniversity = async (data: UniversityInput) => {
  const response = await apiClient.post<ApiResponse<University>>(
    "/universities",
    data,
  );
  return response.data;
};

export const updateUniversity = async (
  id: number,
  data: Partial<UniversityInput>,
) => {
  const response = await apiClient.put<ApiResponse<University>>(
    `/universities/${id}`,
    data,
  );
  return response.data;
};

export const deleteUniversity = async (id: number) => {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/universities/${id}`,
  );
  return response.data;
};

export const getUniversityPrograms = async (universityId: number) => {
  const response = await apiClient.get<ApiResponse<Program[]>>(
    `/universities/${universityId}/programs`,
  );
  return response.data;
};

export const getPrograms = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
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

export const createProgram = async (data: ProgramInput) => {
  const response = await apiClient.post<ApiResponse<Program>>(
    "/programs",
    data,
  );
  return response.data;
};

export const updateProgram = async (
  id: number,
  data: Partial<ProgramInput>,
) => {
  const response = await apiClient.put<ApiResponse<Program>>(
    `/programs/${id}`,
    data,
  );
  return response.data;
};

export const deleteProgram = async (id: number) => {
  const response = await apiClient.delete<ApiResponse<void>>(`/programs/${id}`);
  return response.data;
};

// Interest Management Endpoints
export const getInterests = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await apiClient.get<ApiResponse<PaginatedResult<Interest>>>(
    "/interests",
    { params },
  );
  return response.data;
};

export const getInterest = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Interest>>(
    `/interests/${id}`,
  );
  return response.data;
};

export const createInterest = async (data: InterestInput) => {
  const response = await apiClient.post<ApiResponse<Interest>>(
    "/interests",
    data,
  );
  return response.data;
};

export const updateInterest = async (
  id: number,
  data: Partial<InterestInput>,
) => {
  const response = await apiClient.put<ApiResponse<Interest>>(
    `/interests/${id}`,
    data,
  );
  return response.data;
};

export const deleteInterest = async (id: number) => {
  const response = await apiClient.delete<ApiResponse<void>>(
    `/interests/${id}`,
  );
  return response.data;
};
