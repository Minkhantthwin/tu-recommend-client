"use client";

import { PageHeader } from "@/components/shared/page-header";
import { UniversityList } from "@/components/university/university-list";
import { useUniversities } from "@/hooks/use-universities";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  const { data, isLoading } = useUniversities({
    search: debouncedSearch,
    limit: 50, // Fetch more items for the grid view
  });

  const universities = data?.data?.data || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Universities"
        titleMm="တက္ကသိုလ်များ"
        description="Browse all available technological universities across Myanmar"
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <UniversityList universities={universities} isLoading={isLoading} />
    </div>
  );
}
