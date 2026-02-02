"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useUniversities } from "@/hooks/use-universities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UniversityCarouselProps {
  hideHeader?: boolean;
  className?: string;
}

export function UniversityCarousel({ hideHeader = false, className }: UniversityCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: universitiesData, isLoading } = useUniversities({ limit: 10 });
  const universities = universitiesData?.data?.data || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (universities.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured Universities</h2>
            <p className="text-muted-foreground">
              Explore top technological universities in Myanmar
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="relative group">
        <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {universities.map((university) => (
            <Link
                key={university.id}
                href={`/universities/${university.id}`}
                className="min-w-[260px] sm:min-w-[320px] md:min-w-[420px] snap-center block transition-transform hover:scale-[1.02]"
            >
                <Card className="overflow-hidden h-full border-0 shadow-md">
                <div className="aspect-video relative bg-muted">
                    {university.photoUrl ? (
                    <img
                        src={university.photoUrl}
                        alt={university.name}
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                        <span className="font-semibold text-2xl">{university.code || "TU"}</span>
                    </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                    <h3 className="text-white font-semibold line-clamp-1">{university.name}</h3>
                    {university.nameMyanmar && (
                        <p className="text-white/80 text-sm line-clamp-1">{university.nameMyanmar}</p>
                    )}
                    </div>
                </div>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {university.location}
                    </div>
                    {university.region && (
                        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {university.region}
                        </span>
                    )}
                    </div>
                </CardContent>
                </Card>
            </Link>
            ))}
        </div>
        {/* Scroll buttons overlay if header is hidden */}
        {hideHeader && (
             <>
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
             </>
        )}
      </div>
    </div>
  );
}
