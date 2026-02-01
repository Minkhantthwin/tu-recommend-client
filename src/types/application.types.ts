import { ApplicationStatus } from "./enums";
import { Program } from "./program.types";
import { User } from "./user.types";

/**
 * Application model
 */
export interface Application {
  id: string;
  userId: string;

  // Program choices (up to 3)
  firstChoiceId: number;
  secondChoiceId?: number | null;
  thirdChoiceId?: number | null;

  // Relationships
  firstChoice?: Program;
  secondChoice?: Program | null;
  thirdChoice?: Program | null;

  // Status
  status: ApplicationStatus;

  // Declaration
  declarationAccepted: boolean;
  declarationDate?: string | null;

  // Documents
  transcriptUrl?: string | null;
  certificateUrl?: string | null;
  photoUrl?: string | null;
  recommendationUrl?: string | null;

  // Review info
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  reviewNotes?: string | null;

  // Accepted program (if approved)
  acceptedProgramId?: number | null;
  acceptedProgram?: Program | null;

  // User relation
  user?: User;

  createdAt: string;
  updatedAt: string;
  submittedAt?: string | null;
}

/**
 * Create application input
 */
export interface CreateApplicationInput {
  firstChoiceId: number;
  secondChoiceId?: number;
  thirdChoiceId?: number;
}

/**
 * Update application input
 */
export interface UpdateApplicationInput extends Partial<CreateApplicationInput> {
  declarationAccepted?: boolean;
  transcriptUrl?: string;
  certificateUrl?: string;
  photoUrl?: string;
  recommendationUrl?: string;
}

/**
 * Submit application input (for final submission)
 */
export interface SubmitApplicationInput {
  declarationAccepted: boolean;
}

/**
 * Review application input (admin)
 */
export interface ReviewApplicationInput {
  status: ApplicationStatus;
  reviewNotes?: string;
  acceptedProgramId?: number;
}

/**
 * Application search/filter params
 */
export interface ApplicationFilters {
  status?: ApplicationStatus;
  userId?: string;
  universityId?: number;
  programId?: number;
}
