"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { usePrograms } from "@/hooks/use-programs";
import { useUniversities } from "@/hooks/use-universities";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { Program } from "@/types/program.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Search, MapPin, GraduationCap, Check, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MYANMAR_REGIONS = [
  "Yangon", "Mandalay", "Naypyidaw", "Sagaing", "Bago", "Magway", 
  "Ayeyarwady", "Tanintharyi", "Kachin", "Kayah", "Kayin", "Chin", 
  "Mon", "Rakhine", "Shan"
];

export default function ProgramsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  
  // Filters
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const { data: universitiesData } = useUniversities({ limit: 100 });
  // Fix: Access nested data property for array
  // @ts-ignore - Types might be slightly off but structure is verified
  const universities = universitiesData?.data?.data || [];

  const { data, isLoading } = usePrograms({
    search: debouncedSearch,
    page,
    limit: pageSize,
    eligibleOnly,
    universityId: selectedUniversity !== "all" ? Number(selectedUniversity) : undefined,
    region: selectedRegion !== "all" ? selectedRegion : undefined,
  });
  const programs: Program[] = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const [selectedPrograms, setSelectedPrograms] = useLocalStorage<Program[]>(
    STORAGE_KEYS.PROGRAM_CHOICES,
    [],
  );

  const selectedIds = useMemo(
    () => new Set(selectedPrograms.map((program) => program.id)),
    [selectedPrograms],
  );

  const handleToggleProgram = (program: Program) => {
    setSelectedPrograms((prev) => {
      const exists = prev.some((item) => item.id === program.id);
      if (exists) {
        return prev.filter((item) => item.id !== program.id);
      }
      if (prev.length >= 3) {
        toast.error("You can select up to 3 programs");
        return prev;
      }
      return [...prev, program];
    });
  };

  const handleProceed = () => {
    if (selectedPrograms.length === 0) {
      toast.error("Select at least one program to continue");
      return;
    }
    router.push("/applications/new");
  };

  const clearFilters = () => {
    setSearch("");
    setEligibleOnly(false);
    setSelectedUniversity("all");
    setSelectedRegion("all");
    setPage(1);
  };

  const hasActiveFilters = search || eligibleOnly || selectedUniversity !== "all" || selectedRegion !== "all";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        titleMm="ဘာသာရပ်များ"
        description="Browse and search available programs"
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                className="pl-9"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your program search
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Eligibility</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="mobile-eligible"
                        checked={eligibleOnly}
                        onCheckedChange={(checked) => {
                          setEligibleOnly(checked);
                          setPage(1);
                        }}
                      />
                      <Label htmlFor="mobile-eligible">Eligible Programs Only</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      value={selectedRegion}
                      onValueChange={(value) => {
                        setSelectedRegion(value);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {MYANMAR_REGIONS.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>University</Label>
                    <Select
                      value={selectedUniversity}
                      onValueChange={(value) => {
                        setSelectedUniversity(value);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select University" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Universities</SelectItem>
                        {universities.map((uni: any) => (
                          <SelectItem key={uni.id} value={uni.id.toString()}>
                            {uni.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {hasActiveFilters && (
                    <Button variant="ghost" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-4 lg:flex">
               <div className="flex items-center space-x-2">
                <Switch
                  id="desktop-eligible"
                  checked={eligibleOnly}
                  onCheckedChange={(checked) => {
                    setEligibleOnly(checked);
                    setPage(1);
                  }}
                />
                <Label htmlFor="desktop-eligible" className="cursor-pointer">Eligible</Label>
              </div>

              <Select
                value={selectedRegion}
                onValueChange={(value) => {
                  setSelectedRegion(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {MYANMAR_REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedUniversity}
                onValueChange={(value) => {
                  setSelectedUniversity(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Universities</SelectItem>
                  {universities.map((uni: any) => (
                    <SelectItem key={uni.id} value={uni.id.toString()}>
                      {uni.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear filters">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary">
              Selected {selectedPrograms.length}/3
            </Badge>
            <Button onClick={handleProceed} disabled={selectedPrograms.length === 0}>
              Proceed to Application
            </Button>
          </div>
        </div>
      </div>

      {selectedPrograms.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {selectedPrograms.map((program, index) => (
                <Button
                  key={program.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleProgram(program)}
                >
                  {index + 1}. {program.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : programs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No programs found. Try adjusting your search.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => {
              const isSelected = selectedIds.has(program.id);
              const isDisabled = !isSelected && selectedPrograms.length >= 3;

              return (
                <Card key={program.id} className="flex flex-col">
                  <CardContent className="p-5 flex flex-col gap-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{program.name}</h3>
                          {program.nameMyanmar && (
                            <p className="text-sm text-muted-foreground font-myanmar">
                              {program.nameMyanmar}
                            </p>
                          )}
                        </div>
                        {program.code && (
                          <Badge variant="outline">{program.code}</Badge>
                        )}
                      </div>
                      {program.university && (
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{program.university.location}</span>
                          </div>
                          <div className="mt-1">
                            <Link
                              className="text-primary hover:underline"
                              href={`/universities/${program.university.id}`}
                            >
                              {program.university.name}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      {program.degree && (
                        <Badge variant="secondary">
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-4 w-4" />
                            {program.degree}
                          </div>
                        </Badge>
                      )}
                      {program.minScore && (
                        <Badge variant="outline">Min Score: {program.minScore}</Badge>
                      )}
                      {program.quota && (
                        <Badge variant="outline">Seats: {program.quota}</Badge>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <Button
                        onClick={() => handleToggleProgram(program)}
                        variant={isSelected ? "secondary" : "default"}
                        disabled={isDisabled}
                        className="w-full"
                      >
                        {isSelected ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Apply
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-muted-foreground">Rows per page</p>
                <Select
                  value={`${pageSize}`}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[12, 24, 36, 48].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
                  Page {page} of {pagination.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setPage(pagination.totalPages)}
                    disabled={page === pagination.totalPages}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
