"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInterests } from "@/hooks/use-user-interests";
import { cn } from "@/lib/utils";

export function InterestSelectionForm() {
  const router = useRouter();
  const { 
    myInterests, 
    allInterests, 
    isLoadingAllInterests, 
    isLoadingMyInterests,
    updateInterests, 
    isUpdating 
  } = useUserInterests();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (myInterests.length > 0) {
      setSelectedIds(myInterests.map((interest) => interest.id));
    }
  }, [myInterests]);

  const toggleInterest = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    updateInterests(selectedIds, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  if (isLoadingAllInterests || isLoadingMyInterests) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Your Interests</CardTitle>
        <CardDescription>
          Choose topics you are interested in to get better recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {allInterests.map((interest) => {
            const isSelected = selectedIds.includes(interest.id);
            return (
              <div
                key={interest.id}
                className={cn(
                  "cursor-pointer rounded-lg border p-4 transition-all hover:border-primary",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "bg-card"
                )}
                onClick={() => toggleInterest(interest.id)}
              >
                <div className="flex items-start justify-between">
                  <span className="font-medium">{interest.name}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                {interest.nameMm && (
                  <p className="mt-1 text-xs text-muted-foreground font-myanmar">
                    {interest.nameMm}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={isUpdating || selectedIds.length === 0}
            size="lg"
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Finish & Go to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
