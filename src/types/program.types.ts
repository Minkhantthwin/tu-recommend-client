import { University } from "./university.types";

/**
 * Program model
 */
export interface Program {
  id: number;
  universityId: number;
  name: string;
  nameMm?: string | null;
  code: string;
  description?: string | null;
  descriptionMm?: string | null;
  duration: number; // in years
  degree: string;
  faculty?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  university?: University;
  requirements?: ProgramRequirement | null;
}

/**
 * Program Requirement model
 */
export interface ProgramRequirement {
  id: number;
  programId: number;
  minTotalScore: number;
  minMyanmar?: number | null;
  minEnglish?: number | null;
  minMathematics?: number | null;
  minPhysics?: number | null;
  minChemistry?: number | null;
  minBiology?: number | null;
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
  degree: string;
  faculty?: string;
  isActive?: boolean;
}

/**
 * Create/Update program requirement input
 */
export interface ProgramRequirementInput {
  minTotalScore: number;
  minMyanmar?: number;
  minEnglish?: number;
  minMathematics?: number;
  minPhysics?: number;
  minChemistry?: number;
  minBiology?: number;
  additionalRequirements?: string;
}

/**
 * Program search/filter params
 */
export interface ProgramFilters {
  search?: string;
  universityId?: number;
  degree?: string;
  faculty?: string;
  isActive?: boolean;
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
