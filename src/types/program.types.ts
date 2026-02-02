import { University } from "./university.types";
import { Degree, ProgramStatus } from "./enums";

/**
 * Program model
 */
export interface Program {
  id: number;
  universityId: number;
  name: string;
  nameMm?: string | null;
  nameMyanmar?: string | null; // Added to match API JSON
  code: string;
  description?: string | null;
  descriptionMm?: string | null;
  duration: number; // in years
  degree: Degree;
  faculty?: string | null;
  status: ProgramStatus;
  createdAt: string;
  updatedAt: string;
  university?: University;
  requirements?: ProgramRequirement[];
  minScore?: number; // Added from API JSON
  quota?: number; // Added from API JSON
}

export interface ProgramWithUniversity extends Program {
  university: University;
}

/**
 * Program Requirement model
 */
export interface ProgramRequirement {
  id: number;
  programId: number;
  minTotalScore: number;
  myanmar?: number | null;
  english?: number | null;
  mathematics?: number | null;
  physics?: number | null;
  chemistry?: number | null;
  biology?: number | null;
  additionalRequirements?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create/Update program input
 */
export interface ProgramInput {
  universityId: number;
  name: string;
  nameMm?: string;
  code: string;
  description?: string;
  descriptionMm?: string;
  duration: number;
  degree: Degree;
  faculty?: string;
  status?: ProgramStatus;
  minScore?: number;
  quota?: number;
  requirements?: ProgramRequirementInput;
}

/**
 * Create/Update program requirement input
 */
export interface ProgramRequirementInput {
  minTotalScore: number;
  myanmar?: number;
  english?: number;
  mathematics?: number;
  physics?: number;
  chemistry?: number;
  biology?: number;
  additionalRequirements?: string;
}

/**
 * Program search/filter params
 */
export interface ProgramFilters {
  search?: string;
  universityId?: number;
  degree?: Degree;
  faculty?: string;
  status?: ProgramStatus;
}

/**
 * Eligibility check result
 */
export interface EligibilityResult {
  isEligible: boolean;
  program: Program;
  requirements: ProgramRequirement;
  scores: {
    subject: string;
    userScore: number;
    requiredScore: number;
    meets: boolean;
  }[];
  message: string;
}
