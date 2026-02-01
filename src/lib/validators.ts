import { z } from "zod";

/**
 * Myanmar phone number validation regex
 */
export const myanmarPhoneRegex = /^(\+?959|09)\d{7,9}$/;

/**
 * Myanmar NRC number validation regex
 */
export const nrcRegex = /^\d{1,2}\/[A-Za-z]+\([A-Za-z]\)\d{6}$/;

/**
 * Email validation schema
 */
export const emailSchema = z.string().email("Invalid email address");

/**
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/**
 * Myanmar phone number validation schema
 */
export const phoneSchema = z
  .string()
  .regex(myanmarPhoneRegex, "Invalid Myanmar phone number");

/**
 * NRC validation schema
 */
export const nrcSchema = z
  .string()
  .regex(nrcRegex, "Invalid NRC format (e.g., 12/ThaGaKa(N)123456)");

/**
 * Score validation schema (0-100)
 */
export const scoreSchema = z
  .number()
  .min(0, "Score cannot be negative")
  .max(100, "Score cannot exceed 100");

/**
 * Year validation schema
 */
export const yearSchema = z
  .number()
  .min(2000, "Year must be 2000 or later")
  .max(new Date().getFullYear(), "Year cannot be in the future");

/**
 * Required string validation
 */
export const requiredString = z.string().min(1, "This field is required");

/**
 * Optional string validation
 */
export const optionalString = z.string().optional();

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid("Invalid ID format");
