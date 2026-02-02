/**
 * Matriculation Result model
 */
export interface MatriculationResult {
  id: string;
  userId: string;
  rollNumber: string;
  examYear: number;
  schoolName: string;
  schoolTownship: string;
  schoolRegion: string;
  myanmar: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology?: number | null;
  totalScore: number;
  certificateUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create/Update matriculation input
 */
export interface MatriculationInput {
  rollNumber: string;
  examYear: number;
  schoolName: string;
  schoolTownship: string;
  schoolRegion: string;
  myanmar: number;
  english: number;
  mathematics: number;
  physics: number;
  chemistry: number;
  biology?: number;
  certificateUrl?: string;
}

/**
 * Subject score type
 */
export interface SubjectScore {
  key: keyof Pick<
    MatriculationResult,
    "myanmar" | "english" | "mathematics" | "physics" | "chemistry" | "biology"
  >;
  label: string;
  score: number;
}
