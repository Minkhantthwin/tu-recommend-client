/**
 * University model
 */
export interface University {
  id: number;
  name: string;
  nameMm?: string | null;
  code: string;
  description?: string | null;
  descriptionMm?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  photos?: UniversityPhoto[];
  programs?: Program[];
  _count?: {
    programs: number;
  };
}

/**
 * University Photo model
 */
export interface UniversityPhoto {
  id: number;
  universityId: number;
  url: string;
  caption?: string | null;
  order: number;
  createdAt: string;
}

/**
 * Program model (imported from program.types.ts)
 */
import { Program } from "./program.types";

/**
 * Create/Update university input
 */
export interface UniversityInput {
  name: string;
  nameMm?: string;
  code: string;
  description?: string;
  descriptionMm?: string;
  address?: string;
  city?: string;
  state?: string;
  website?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  isActive?: boolean;
}

/**
 * University search/filter params
 */
export interface UniversityFilters {
  search?: string;
  city?: string;
  state?: string;
  isActive?: boolean;
}
