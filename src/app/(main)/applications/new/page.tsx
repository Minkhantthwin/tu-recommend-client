"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { Program } from "@/types/program.types";
import { useApplications } from "@/hooks/use-applications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { toast } from "sonner";

const choiceLabels = ["First Choice", "Second Choice", "Third Choice"];

export default function NewApplicationPage() {
  const router = useRouter();
  const [selectedPrograms, setSelectedPrograms] = useLocalStorage<Program[]>(
    STORAGE_KEYS.PROGRAM_CHOICES,
    [],
  );
  const { createApplication, isCreating } = useApplications({ enabled: false });

  const handleRemove = (programId: number) => {
    setSelectedPrograms((prev) =>
      prev.filter((program) => program.id !== programId),
    );
  };

  const moveProgram = (index: number, direction: -1 | 1) => {
    setSelectedPrograms((prev) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= prev.length) {
        return prev;
      }
      const updated = [...prev];
      [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];
      return updated;
    });
  };

  const handleCreateApplication = () => {
    if (selectedPrograms.length === 0) {
      toast.error("Select at least one program to continue");
      return;
    }

    createApplication(
      {
        firstChoiceId: selectedPrograms[0].id,
        secondChoiceId: selectedPrograms[1]?.id,
        thirdChoiceId: selectedPrograms[2]?.id,
      },
      {
        onSuccess: () => {
          setSelectedPrograms([]);
          router.push("/applications");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Application"
        titleMm="လျှောက်လွှာအသစ်"
        description="Create a new university application"
      />

      {selectedPrograms.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No programs selected yet. Choose up to 3 programs to apply.
            </p>
            <Button asChild>
              <Link href="/programs">Browse Programs</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Program Choices</h3>
              <Badge variant="secondary">
                {selectedPrograms.length}/3 selected
              </Badge>
            </div>

            <div className="space-y-3">
              {selectedPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className="rounded-lg border p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <Badge variant="outline">{choiceLabels[index]}</Badge>
                    <div className="font-semibold">{program.name}</div>
                    {program.university && (
                      <div className="text-sm text-muted-foreground">
                        {program.university.name}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => moveProgram(index, -1)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => moveProgram(index, 1)}
                      disabled={index === selectedPrograms.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(program.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-end">
              <Button variant="outline" asChild>
                <Link href="/programs">Edit Selection</Link>
              </Button>
              <Button onClick={handleCreateApplication} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Application"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
