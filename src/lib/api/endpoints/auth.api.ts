import { apiClient } from "../client";
import { API_ROUTES } from "@/lib/constants";
import type { LoginInput, RegisterInput, AuthResponse, User } from "@/types";

/**
 * Login user
 */
export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(`${API_ROUTES.AUTH}/login`, data);
  return response.data;
}

/**
 * Register new user
 */
export async function register(data: RegisterInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(`${API_ROUTES.AUTH}/register`, data);
  return response.data;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await apiClient.post(`${API_ROUTES.AUTH}/logout`);
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>(`${API_ROUTES.AUTH}/me`);
  return response.data;
}

/**
 * Refresh access token
 */
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(`${API_ROUTES.AUTH}/refresh`, {
    refreshToken,
  });
  return response.data;
}

/**
 * Request password reset
 */
export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post(`${API_ROUTES.AUTH}/forgot-password`, { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, password: string): Promise<void> {
  await apiClient.post(`${API_ROUTES.AUTH}/reset-password`, { token, password });
}
