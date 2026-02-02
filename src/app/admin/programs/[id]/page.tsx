"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminProgram, useAdminPrograms } from "@/hooks/use-admin-programs";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash, ArrowLeft, BookOpen, Clock, GraduationCap, School } from "lucide-react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProgramStatus } from "@/types/enums";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const programId = parseInt(id);
  const { data: programData, isLoading, error } = useAdminProgram(programId);
  const program = programData?.data;
  const { deleteProgram, isDeleting } = useAdminPrograms();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteProgram(programId, {
      onSuccess: () => {
        router.push("/admin/programs");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center text-destructive space-y-4">
        <p>Failed to load program details</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader
            title={program.name}
            description={program.code || undefined}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push(`/admin/programs/${id}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-xs truncate">{program.id}</span>
              
              <span className="text-muted-foreground">Name (Mm):</span>
              <span className="font-myanmar">{program.nameMm || "-"}</span>
              
              <span className="text-muted-foreground">Status:</span>
              <span>
                <Badge variant={program.status === ProgramStatus.ACTIVE ? "default" : "secondary"}>
                  {program.status}
                </Badge>
              </span>
              
              <span className="text-muted-foreground">Created At:</span>
              <span>{program.createdAt ? format(new Date(program.createdAt), "PPP") : "N/A"}</span>
              
              <span className="text-muted-foreground">Updated At:</span>
              <span>{program.updatedAt ? format(new Date(program.updatedAt), "PPP") : "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              Academic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">University:</span>
                <span className="font-medium">{program.university?.name || "Unknown"}</span>

                <span className="text-muted-foreground">Degree:</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" /> {program.degree}
                </span>

                <span className="text-muted-foreground">Duration:</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {program.duration} years
                </span>

                <span className="text-muted-foreground">Faculty:</span>
                <span>{program.faculty || "-"}</span>
             </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Admission Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            {program.requirements && program.requirements.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Min Total Score</span>
                    <p className="text-2xl font-bold text-primary">{program.requirements[0].minTotalScore || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">English</span>
                    <p className="text-lg font-semibold">{program.requirements[0].english || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Mathematics</span>
                    <p className="text-lg font-semibold">{program.requirements[0].mathematics || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Physics</span>
                    <p className="text-lg font-semibold">{program.requirements[0].physics || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Chemistry</span>
                    <p className="text-lg font-semibold">{program.requirements[0].chemistry || "-"}</p>
                  </div>
                   <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Biology</span>
                    <p className="text-lg font-semibold">{program.requirements[0].biology || "-"}</p>
                  </div>
                   <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Myanmar</span>
                    <p className="text-lg font-semibold">{program.requirements[0].myanmar || "-"}</p>
                  </div>
                </div>
                {program.requirements[0].additionalRequirements && (
                  <div className="pt-4 border-t">
                    <span className="text-sm font-medium text-muted-foreground">Additional Requirements</span>
                    <p className="mt-1 text-sm">{program.requirements[0].additionalRequirements}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No specific requirements listed.</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">English</h4>
              <p className="text-sm text-muted-foreground">{program.description || "No description provided."}</p>
            </div>
            {program.descriptionMm && (
              <div>
                <h4 className="text-sm font-medium mb-1">Myanmar</h4>
                <p className="text-sm text-muted-foreground font-myanmar">{program.descriptionMm}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Program"
        description="Are you sure you want to delete this program? This action cannot be undone."
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
