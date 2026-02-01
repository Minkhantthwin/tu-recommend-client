import { format, formatDistance, formatRelative, isValid, parseISO } from "date-fns";

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string, formatStr: string = "PPP"): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return format(parsedDate, formatStr);
}

/**
 * Format a date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return formatDistance(parsedDate, new Date(), { addSuffix: true });
}

/**
 * Format a date relative to today
 */
export function formatRelativeDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return formatRelative(parsedDate, new Date());
}

/**
 * Format a number as a score (e.g., 85/100)
 */
export function formatScore(score: number, maxScore: number = 100): string {
  return `${score}/${maxScore}`;
}

/**
 * Format a percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a phone number (Myanmar format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("959")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
