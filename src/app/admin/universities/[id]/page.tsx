"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useAdminUniversities, useAdminUniversity } from "@/hooks/use-admin-universities";
import { useRouter } from "next/navigation";
import { Loader2, Edit, Trash, MapPin, Globe, Calendar, FileText } from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { format } from "date-fns";

interface UniversityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { id } = use(params);
  const universityId = parseInt(id);
  const { data: universityData, isLoading } = useAdminUniversity(universityId);
  const { deleteUniversity, isDeleting } = useAdminUniversities();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteUniversity(universityId, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        router.push("/admin/universities");
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

  if (!universityData?.data) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        University not found
      </div>
    );
  }

  const university = universityData.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title={university.name}
          description={university.nameMyanmar || "University Details"}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/universities/${universityId}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {university.logoUrl && (
                <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={university.logoUrl}
                    alt={`${university.name} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-muted-foreground">Name (English)</h3>
                <p>{university.name}</p>
              </div>
              
              {university.nameMyanmar && (
                <div>
                  <h3 className="font-medium text-muted-foreground">Name (Myanmar)</h3>
                  <p className="font-myanmar">{university.nameMyanmar}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-muted-foreground">Code</h3>
                <p>{university.code || "-"}</p>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground">Created At</h3>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {university.createdAt ? format(new Date(university.createdAt), "PPP") : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location & Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground">Location</h3>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                {university.location}
              </p>
            </div>

            {university.region && (
              <div>
                <h3 className="font-medium text-muted-foreground">Region</h3>
                <p className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  {university.region}
                </p>
              </div>
            )}

            {university.description && (
              <div>
                <h3 className="font-medium text-muted-foreground">Description</h3>
                <div className="flex items-start">
                  <FileText className="mr-2 h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <p className="whitespace-pre-wrap">{university.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {university.photoUrl && (
        <Card>
          <CardHeader>
            <CardTitle>University Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={university.photoUrl}
                alt={`${university.name} photo`}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete University"
        description="Are you sure you want to delete this university? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
