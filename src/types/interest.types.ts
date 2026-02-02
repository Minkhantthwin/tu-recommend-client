/**
 * Interest/Category model
 */
export interface Interest {
  id: number;
  name: string;
  nameMm?: string | null;
  description?: string | null;
  descriptionMm?: string | null;
  icon?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
  };
}

/**
 * User Interest (join table)
 */
export interface UserInterest {
  id: number;
  userId: string;
  interestId: number;
  interest?: Interest;
  createdAt: string;
}

/**
 * Create/Update interest input
 */
export interface InterestInput {
  name: string;
  nameMm?: string;
  description?: string;
  descriptionMm?: string;
  icon?: string;
  isActive?: boolean;
}

/**
 * Update user interests input
 */
export interface UpdateUserInterestsInput {
  interestIds: number[];
}
