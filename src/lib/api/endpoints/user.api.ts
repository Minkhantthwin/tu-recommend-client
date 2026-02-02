import { apiClient } from "../client";
import { ApiResponse } from "@/types/api.types";
import { UserProfile } from "@/types/user.types";

export interface CreateUserProfileInput {
  nameMyanmar: string;
  nameEnglish: string;
  nrc: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  ethnicity: string;
  nationality: string;
  maritalStatus: string;
  phone: string;
  alternatePhone?: string;
  permanentAddress: string;
  permanentTownship: string;
  permanentRegion: string;
  currentAddress?: string;
  currentTownship?: string;
  currentRegion?: string;
  fatherName: string;
  fatherNrc?: string;
  fatherOccupation?: string;
  fatherPhone?: string;
  motherName: string;
  motherNrc?: string;
  motherOccupation?: string;
  motherPhone?: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  guardianAddress?: string;
  photoUrl?: string;
}

export interface UpdateUserProfileInput extends Partial<CreateUserProfileInput> {}

export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get<ApiResponse<UserProfile>>(
    `/users/${userId}/profile`,
  );
  return response.data;
};

export const createUserProfile = async (
  userId: string,
  data: CreateUserProfileInput,
) => {
  const response = await apiClient.post<ApiResponse<UserProfile>>(
    `/users/${userId}/profile`,
    data,
  );
  return response.data;
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfileInput,
) => {
  const response = await apiClient.put<ApiResponse<UserProfile>>(
    `/users/${userId}/profile`,
    data,
  );
  return response.data;
};
