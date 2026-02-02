"use client";

import { University } from "@/types/university.types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, School, BookOpen, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UniversityDetailViewProps {
  university: University;
}

export function UniversityDetailView({ university }: UniversityDetailViewProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden bg-muted">
        {university.photoUrl ? (
          <img
            src={university.photoUrl}
            alt={university.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-secondary/30">
            <School className="h-24 w-24 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
          <div className="flex items-end gap-4 md:gap-6">
            {university.logoUrl && (
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-background bg-background overflow-hidden shrink-0">
                <img
                  src={university.logoUrl}
                  alt={`${university.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="text-white mb-1">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {university.name}
              </h1>
              {university.nameMyanmar && (
                <p className="text-lg opacity-90 font-myanmar mt-1">
                  {university.nameMyanmar}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <School className="h-6 w-6 text-primary" />
            About University
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6">
                {university.description || "No description available."}
              </p>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">University Code</span>
                  <Badge variant="outline">{university.code || "N/A"}</Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Location</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{university.location}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Region</span>
                  <Badge variant="secondary">{university.region || "N/A"}</Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Total Programs</span>
                  <span className="font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    {university.programs?.length || university._count?.programs || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Programs Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Academic Programs
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {university.programs && university.programs.length > 0 ? (
              university.programs.map((program) => (
                <Card key={program.id} className="hover:bg-muted/50 transition-colors h-full flex flex-col">
                  <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{program.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {program.code}
                          </Badge>
                        </div>
                        {program.nameMyanmar && (
                          <p className="text-sm text-muted-foreground font-myanmar mb-2">
                            {program.nameMyanmar}
                          </p>
                        )}
                      </div>
                      {program.minScore && (
                        <div className="text-right shrink-0 bg-secondary/50 p-2 rounded-lg">
                          <span className="text-xs text-muted-foreground block uppercase tracking-wider">Min Score</span>
                          <span className="font-bold text-lg text-primary">{program.minScore}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {program.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t mt-auto">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4" />
                        <span className="font-medium">{program.degree}</span>
                      </div>
                      {program.quota && (
                        <div className="ml-auto">
                          <span className="font-medium text-foreground">{program.quota}</span> <span className="opacity-70">Seats</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-8 text-center text-muted-foreground">
                  No programs listed for this university yet.
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
