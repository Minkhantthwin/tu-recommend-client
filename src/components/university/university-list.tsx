"use client";

import { University } from "@/types/university.types";
import { UniversityCard } from "./university-card";
import { Loader2 } from "lucide-react";

interface UniversityListProps {
  universities: University[];
  isLoading: boolean;
}

export function UniversityList({ universities, isLoading }: UniversityListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h3 className="text-lg font-semibold">No universities found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {universities.map((university) => (
        <UniversityCard key={university.id} university={university} />
      ))}
    </div>
  );
}
