/**
 * Application Status Labels (Myanmar)
 */
export const APPLICATION_STATUS_LABELS = {
  DRAFT: "စာကြမ်း",
  SUBMITTED: "တင်သွင်းပြီး",
  UNDER_REVIEW: "စိစစ်ဆဲ",
  ACCEPTED: "အတည်ပြုပြီး",
  REJECTED: "ငြင်းပယ်ပြီး",
  WITHDRAWN: "ရုပ်သိမ်းပြီး",
} as const;

/**
 * Gender Labels (Myanmar)
 */
export const GENDER_LABELS = {
  MALE: "ကျား",
  FEMALE: "မ",
} as const;

/**
 * Religion Labels (Myanmar)
 */
export const RELIGION_LABELS = {
  BUDDHIST: "ဗုဒ္ဓဘာသာ",
  CHRISTIAN: "ခရစ်ယာန်",
  MUSLIM: "မွတ်စလင်",
  HINDU: "ဟိန္ဒူ",
  OTHER: "အခြား",
} as const;

/**
 * Marital Status Labels (Myanmar)
 */
export const MARITAL_STATUS_LABELS = {
  SINGLE: "လူပျို/အပျို",
  MARRIED: "အိမ်ထောင်ရှိ",
} as const;

/**
 * User Role Labels
 */
export const USER_ROLE_LABELS = {
  USER: "User",
  ADMIN: "Administrator",
} as const;

/**
 * Subject Labels (Myanmar)
 */
export const SUBJECT_LABELS = {
  myanmar: "မြန်မာစာ",
  english: "အင်္ဂလိပ်စာ",
  mathematics: "သင်္ချာ",
  physics: "ရူပဗေဒ",
  chemistry: "ဓာတုဗေဒ",
  biology: "ဇီဝဗေဒ",
} as const;

/**
 * Maximum scores
 */
export const MAX_SUBJECT_SCORE = 100;
export const MAX_TOTAL_SCORE = 600;

/**
 * Pagination defaults
 */
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/**
 * File upload constraints
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_DOCUMENT_TYPES = ["application/pdf"];

/**
 * API endpoints base paths
 */
export const API_ROUTES = {
  AUTH: "/auth",
  USERS: "/users",
  PROFILE: "/profile",
  MATRICULATION: "/matriculation",
  UNIVERSITIES: "/universities",
  PROGRAMS: "/programs",
  APPLICATIONS: "/applications",
  INTERESTS: "/interests",
  RECOMMENDATIONS: "/recommendations",
  UPLOAD: "/upload",
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "tu-access-token",
  REFRESH_TOKEN: "tu-refresh-token",
  USER: "tu-user",
  THEME: "tu-theme",
  PROGRAM_CHOICES: "tu-program-choices",
} as const;
