"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useUniversity } from "@/hooks/use-universities";
import { UniversityDetailView } from "@/components/university/university-detail-view";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from "react";

export default function UniversityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const universityId = parseInt(id);
  const { data, isLoading, error } = useUniversity(universityId);
  const university = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="University Not Found"
          titleMm="တက္ကသိုလ်မတွေ့ရှိပါ"
          description="The requested university could not be found"
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Loading University</h3>
            <p className="text-muted-foreground mb-6">
              {(error as Error)?.message || "The university you are looking for does not exist or has been removed."}
            </p>
            <Button asChild variant="outline">
              <Link href="/universities">Back to Universities</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="University Details"
        titleMm="တက္ကသိုလ်အသေးစိတ်"
        description={`Detailed information about ${university.name}`}
      />

      <UniversityDetailView university={university} />
    </div>
  );
}
