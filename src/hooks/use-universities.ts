import { useQuery } from "@tanstack/react-query";
import {
  getUniversities,
  getUniversity,
} from "@/lib/api/endpoints/university.api";

export function useUniversities(params?: {
  page?: number;
  limit?: number;
  search?: string;
  region?: string;
}) {
  return useQuery({
    queryKey: ["universities", params],
    queryFn: () => getUniversities(params),
  });
}

export function useUniversity(id: number) {
  return useQuery({
    queryKey: ["university", id],
    queryFn: () => getUniversity(id),
    enabled: !!id,
  });
}
