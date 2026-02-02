import { useQuery } from "@tanstack/react-query";
import {
  getTopPrograms,
  getSuggestedPrograms,
} from "@/lib/api/endpoints/recommendation.api";

export function useTopPrograms(limit = 5) {
  return useQuery({
    queryKey: ["top-programs", limit],
    queryFn: () => getTopPrograms({ limit }),
  });
}

export function useSuggestedPrograms(limit = 10) {
  return useQuery({
    queryKey: ["suggested-programs", limit],
    queryFn: () => getSuggestedPrograms({ limit }),
  });
}
