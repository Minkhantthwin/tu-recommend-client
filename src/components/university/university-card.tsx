"use client";

import Link from "next/link";
import { MapPin, School, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { University } from "@/types/university.types";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-muted overflow-hidden rounded-t-xl">
        {university.photoUrl ? (
          <img
            src={university.photoUrl}
            alt={university.name}
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-secondary/30">
            <School className="h-16 w-16 text-muted-foreground/50" />
          </div>
        )}
        {university.logoUrl && (
          <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full border-4 border-background bg-background overflow-hidden shadow-sm">
            <img
              src={university.logoUrl}
              alt={`${university.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold text-xl leading-tight line-clamp-2">
              {university.name}
            </h3>
            {university.nameMyanmar && (
              <p className="text-sm text-muted-foreground font-myanmar mt-1 line-clamp-1">
                {university.nameMyanmar}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{university.location}</span>
          </div>
          {university.region && (
            <Badge variant="outline" className="text-xs font-normal">
              {university.region}
            </Badge>
          )}
        </div>
        
        {university.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {university.description}
          </p>
        )}

        <div className="mt-auto pt-2">
          <Button asChild variant="secondary" className="w-full group">
            <Link href={`/universities/${university.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
