"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { useApplications } from "@/hooks/use-applications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, FileText, Calendar, ChevronRight } from "lucide-react";
import { ApplicationStatus } from "@/types/enums";
import { format } from "date-fns";

const statusColors: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  [ApplicationStatus.DRAFT]: "secondary",
  [ApplicationStatus.SUBMITTED]: "default",
  [ApplicationStatus.UNDER_REVIEW]: "default",
  [ApplicationStatus.ACCEPTED]: "default",
  [ApplicationStatus.REJECTED]: "destructive",
  [ApplicationStatus.WITHDRAWN]: "outline",
};

export default function ApplicationsList() {
  // @ts-ignore - useApplications hook might need update or types checking
  const { applications, isLoading } = useApplications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="My Applications"
          titleMm="ကျွန်ုပ်၏လျှောက်လွှာများ"
          description="View and manage your university applications"
        />
        <Button asChild>
          <Link href="/applications/new">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : applications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No applications yet</h3>
            <p className="mb-4 max-w-sm text-muted-foreground">
              You haven't submitted any university applications yet. Start your journey today!
            </p>
            <Button asChild>
              <Link href="/applications/new">Create Application</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application: any) => (
            <Card key={application.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="border-b bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[application.status as ApplicationStatus] || "outline"}>
                      {application.status.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      #{application.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(application.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase">First Choice</span>
                    <p className="font-medium truncate" title={application.firstChoice?.name}>
                      {application.firstChoice?.name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {application.firstChoice?.university?.name}
                    </p>
                  </div>
                  {application.secondChoice && (
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">Second Choice</span>
                      <p className="font-medium truncate" title={application.secondChoice?.name}>
                        {application.secondChoice?.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {application.secondChoice?.university?.name}
                      </p>
                    </div>
                  )}
                  {application.thirdChoice && (
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">Third Choice</span>
                      <p className="font-medium truncate" title={application.thirdChoice?.name}>
                        {application.thirdChoice?.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {application.thirdChoice?.university?.name}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/applications/${application.id}`}>
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}