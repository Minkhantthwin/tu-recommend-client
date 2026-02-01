/**
 * Environment variables configuration
 * All environment variables should be accessed through this module
 */
export const env = {
  // API Configuration
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",

  // App Configuration
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_ENV: process.env.NODE_ENV || "development",

  // Feature Flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_DEBUG: process.env.NODE_ENV === "development",
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv() {
  const required: (keyof typeof env)[] = ["API_URL", "APP_URL"];

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

export type Env = typeof env;
