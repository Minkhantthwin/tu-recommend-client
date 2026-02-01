/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * API error response
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

/**
 * Pagination query params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Search query params
 */
export interface SearchParams extends PaginationParams {
  search?: string;
  filters?: Record<string, string | number | boolean>;
}
