import { MatriculationResult } from "./matriculation.types";
import { ProgramWithUniversity } from "./program.types";

export interface RecommendedProgram extends ProgramWithUniversity {
  matchScore: number;
  matchReasons?: string[];
}

export interface RecommendationResponse {
  matriculation: MatriculationResult;
  topPrograms?: RecommendedProgram[];
  recommendedPrograms?: RecommendedProgram[];
  eligiblePrograms?: any[]; // Fallback for debugging
  totalEligible: number;
}

export interface RecommendationParams {
  limit?: number;
}
