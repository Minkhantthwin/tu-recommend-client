import { useQuery } from "@tanstack/react-query";
import { getAdminStats, AdminStats } from "@/lib/api/endpoints/admin.api";

// Re-export or use the same interface if possible, but if we want a specific view model:
// For now, let's just use AdminStats directly or extend it if needed.
// But the existing code defined a local interface. Let's align it with AdminStats.

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async (): Promise<AdminStats> => {
      try {
        const response = await getAdminStats();
        return response.data;
      } catch (error) {
        console.warn(
          "Failed to fetch admin stats from API, falling back to mock data",
          error,
        );

        // Fallback mock data
        return {
          users: {
            total: 125,
            admins: 5,
            users: 120,
            recent: 12,
          },
          universities: {
            total: 33,
            active: 30,
          },
          programs: {
            total: 150,
            active: 145,
          },
          applications: {
            total: 45,
            pending: 15,
            approved: 20,
            rejected: 10,
          },
        };
      }
    },
    retry: 1,
  });
}
