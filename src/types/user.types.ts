import { Gender, Religion, MaritalStatus, UserRole } from "./enums";

/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile | null;
}

/**
 * User Profile model
 */
export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string | null;
  gender?: Gender | null;
  religion?: Religion | null;
  maritalStatus?: MaritalStatus | null;
  nrc?: string | null;
  nationality?: string | null;
  ethnicity?: string | null;
  photoUrl?: string | null;
  
  // Current Address
  currentAddress?: string | null;
  currentCity?: string | null;
  currentState?: string | null;
  currentCountry?: string | null;
  
  // Permanent Address
  permanentAddress?: string | null;
  permanentCity?: string | null;
  permanentState?: string | null;
  permanentCountry?: string | null;
  
  // Parent/Guardian Info
  fatherName?: string | null;
  fatherOccupation?: string | null;
  fatherPhone?: string | null;
  motherName?: string | null;
  motherOccupation?: string | null;
  motherPhone?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
  guardianPhone?: string | null;
  
  createdAt: string;
  updatedAt: string;
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
  firstName: string;
  lastName: string;
  phone?: string;
}

/**
 * Auth response with tokens
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

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
