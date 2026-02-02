"use client";

import Link from "next/link";
import { ArrowRight, Star, Trophy } from "lucide-react";
import { useTopPrograms } from "@/hooks/use-recommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function TopPrograms() {
  const { data, isLoading } = useTopPrograms(5);
  const topPrograms = data?.data?.topPrograms || [];

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (topPrograms.length === 0) {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Trophy className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg">No Recommendations Yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-4">
            Complete your profile with matriculation results to get personalized program recommendations.
          </p>
          <Button asChild variant="outline">
            <Link href="/profile/edit">Update Profile</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          Top Programs for You
        </h2>
        <p className="text-muted-foreground">
          Based on your matriculation scores and interests
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topPrograms.map((program) => (
          <Card key={program.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <Badge variant="secondary" className="mb-2">
                  Match Score: {program.matchScore}%
                </Badge>
                {program.minScore && (
                    <span className="text-xs font-medium text-muted-foreground">
                        Min: {program.minScore}
                    </span>
                )}
              </div>
              <CardTitle className="text-lg line-clamp-2 leading-tight">
                {program.name}
              </CardTitle>
              {program.nameMyanmar && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {program.nameMyanmar}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-foreground">University:</span>{" "}
                  <span className="text-muted-foreground">{program.university?.name}</span>
                </div>
                {program.matchReasons && program.matchReasons.length > 0 && (
                  <div className="text-xs text-muted-foreground bg-muted p-2 rounded-md">
                    <ul className="list-disc list-inside space-y-1">
                      {program.matchReasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="line-clamp-1">{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <Button asChild variant="secondary" className="w-full mt-2 group">
                <Link href={`/programs/${program.id}`}>
                  View Details 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
