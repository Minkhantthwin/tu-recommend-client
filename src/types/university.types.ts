import { Program } from "./program.types";

/**
 * University model matching Prisma schema
 */
export interface University {
  id: number;
  name: string;
  nameMyanmar?: string | null;
  code?: string | null;
  location: string;
  region?: string | null;
  description?: string | null;
  photoUrl?: string | null;
  logoUrl?: string | null;

  createdAt: string;
  updatedAt: string;

  programs?: Program[];
  _count?: {
    programs: number;
  };
}

/**
 * Create/Update university input
 */
export interface UniversityInput {
  name: string;
  nameMyanmar?: string;
  code?: string;
  location: string;
  region?: string;
  description?: string;
  photoUrl?: string;
  logoUrl?: string;
}

/**
 * University search/filter params
 */
export interface UniversityFilters {
  search?: string;
  region?: string;
}
