import { ApiResponse } from "./api.types";
import { Gender, Religion, MaritalStatus, UserRole } from "./enums";
import { MatriculationResult } from "./matriculation.types";
import { UserInterest } from "./interest.types";

/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  profile?: UserProfile | null;
  matriculation?: MatriculationResult | null;
  interests?: UserInterest[];
}

/**
 * User Profile model
 */
export interface UserProfile {
  id: number;
  userId: string;
  nameMyanmar?: string | null;
  nameEnglish?: string | null;
  nrc?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null; // MALE, FEMALE
  religion?: string | null; // BUDDHIST, CHRISTIAN, etc.
  ethnicity?: string | null;
  nationality?: string | null;
  maritalStatus?: string | null; // SINGLE, MARRIED
  phone?: string | null;
  alternatePhone?: string | null;

  // Addresses
  permanentAddress?: string | null;
  permanentTownship?: string | null;
  permanentRegion?: string | null;
  currentAddress?: string | null;
  currentTownship?: string | null;
  currentRegion?: string | null;

  // Parents/Guardian
  fatherName?: string | null;
  fatherNrc?: string | null;
  fatherOccupation?: string | null;
  fatherPhone?: string | null;
  motherName?: string | null;
  motherNrc?: string | null;
  motherOccupation?: string | null;
  motherPhone?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
  guardianPhone?: string | null;
  guardianAddress?: string | null;

  photoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Login input
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Register input
 */
export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword?: string;
  role?: UserRole;
}

/**
 * Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

/**
 * Auth data
 */
export interface AuthData {
  user: User;
  tokens: AuthTokens;
}

/**
 * Auth response with tokens
 */
export type AuthResponse = ApiResponse<AuthData>;

/**
 * Tokens response (for refresh)
 */
export type TokensResponse = ApiResponse<AuthTokens>;

/**
 * Update profile input
 */
export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  religion?: Religion;
  maritalStatus?: MaritalStatus;
  nrc?: string;
  nationality?: string;
  ethnicity?: string;
  photoUrl?: string;
  currentAddress?: string;
  currentCity?: string;
  currentState?: string;
  currentCountry?: string;
  permanentAddress?: string;
  permanentCity?: string;
  permanentState?: string;
  permanentCountry?: string;
  fatherName?: string;
  fatherOccupation?: string;
  fatherPhone?: string;
  motherName?: string;
  motherOccupation?: string;
  motherPhone?: string;
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
}
