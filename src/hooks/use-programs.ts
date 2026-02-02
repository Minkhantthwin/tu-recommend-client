import { useQuery } from "@tanstack/react-query";
import { getProgram, getPrograms } from "@/lib/api/endpoints/university.api";
import { getEligiblePrograms } from "@/lib/api/endpoints/recommendation.api";

export function usePrograms(params?: {
  page?: number;
  limit?: number;
  search?: string;
  universityId?: number;
  minScore?: number;
  maxScore?: number;
  eligibleOnly?: boolean;
  region?: string;
}) {
  return useQuery({
    queryKey: ["programs", params],
    queryFn: () => {
      if (params?.eligibleOnly) {
        return getEligiblePrograms({
          page: params.page,
          limit: params.limit,
          search: params.search,
          universityId: params.universityId,
          region: params.region,
        });
      }
      return getPrograms(params);
    },
  });
}

export function useProgram(id: number) {
  return useQuery({
    queryKey: ["program", id],
    queryFn: () => getProgram(id),
    enabled: !!id,
  });
}
