"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/endpoints/admin.api";
import { PageHeader } from "@/components/shared/page-header";
import { Loader2, ArrowLeft, Award, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function AdminUserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["admin-user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center text-destructive space-y-4">
        <p>Failed to load user details</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Cast user data (it might be wrapped in data property depending on API response structure, 
  // but getUser returns response.data which is User object based on my previous edit to admin.api.ts)
  // Let's verify admin.api.ts: 
  // export const getUser = async (id: string) => { const response = ...; return response.data; };
  // Wait, if response.data is ApiResponse<User>, then it has { success: boolean, data: User, ... }
  // Let's check api.types.ts: interface ApiResponse<T> { success: boolean; data: T; ... }
  // So getUser returns { success: boolean, data: User }
  // So 'user' here is the ApiResponse object.
  // We need to access user.data to get the User object.

  const userData = user?.data;

  if (!userData) {
      return (
        <div className="flex flex-col h-[50vh] items-center justify-center text-destructive space-y-4">
          <p>User data not found</p>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <PageHeader
          title="User Details"
          description={`View details for ${userData.email}`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-xs truncate" title={userData.id}>{userData.id}</span>
              
              <span className="text-muted-foreground">Email:</span>
              <span>{userData.email}</span>
              
              <span className="text-muted-foreground">Role:</span>
              <span>
                <Badge variant={userData.role === "ADMIN" ? "default" : "secondary"}>
                  {userData.role}
                </Badge>
              </span>
              
              <span className="text-muted-foreground">Joined:</span>
              <span>{userData.createdAt ? format(new Date(userData.createdAt), "PPP") : "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Matriculation Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Matriculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.matriculation ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Roll Number:</span>
                  <span className="font-medium">{userData.matriculation.rollNumber}</span>
                  
                  <span className="text-muted-foreground">Exam Year:</span>
                  <span>{userData.matriculation.examYear}</span>
                  
                  <span className="text-muted-foreground">Total Score:</span>
                  <span className="font-bold text-lg">{userData.matriculation.totalScore}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">Myanmar</div>
                    <div className="font-medium">{userData.matriculation.myanmar}</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">English</div>
                    <div className="font-medium">{userData.matriculation.english}</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">Math</div>
                    <div className="font-medium">{userData.matriculation.mathematics}</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">Physics</div>
                    <div className="font-medium">{userData.matriculation.physics}</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">Chemistry</div>
                    <div className="font-medium">{userData.matriculation.chemistry}</div>
                  </div>
                  <div className="text-center p-2 bg-muted/20 rounded">
                    <div className="text-xs text-muted-foreground">Biology</div>
                    <div className="font-medium">{userData.matriculation.biology || "-"}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No matriculation data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Profile */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Personal Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.profile ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium border-b pb-2">Personal Details</h4>
                  <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                    <span className="text-muted-foreground">Name (En):</span>
                    <span>{userData.profile.nameEnglish}</span>
                    
                    <span className="text-muted-foreground">Name (Mm):</span>
                    <span className="font-myanmar">{userData.profile.nameMyanmar}</span>
                    
                    <span className="text-muted-foreground">NRC:</span>
                    <span>{userData.profile.nrc}</span>
                    
                    <span className="text-muted-foreground">DOB:</span>
                    <span>{userData.profile.dateOfBirth ? format(new Date(userData.profile.dateOfBirth), "PPP") : "N/A"}</span>
                    
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{userData.profile.gender}</span>
                    
                    <span className="text-muted-foreground">Religion:</span>
                    <span>{userData.profile.religion}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium border-b pb-2">Contact & Family</h4>
                  <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{userData.profile.phone}</span>
                    
                    <span className="text-muted-foreground">Address:</span>
                    <span>{userData.profile.permanentAddress}, {userData.profile.permanentTownship}, {userData.profile.permanentRegion}</span>
                    
                    <span className="text-muted-foreground">Father:</span>
                    <span>{userData.profile.fatherName}</span>
                    
                    <span className="text-muted-foreground">Mother:</span>
                    <span>{userData.profile.motherName}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No profile data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.interests && userData.interests.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userData.interests.map((ui) => (
                  <Badge key={ui.id} variant="outline" className="text-sm py-1 px-3">
                    {ui.interest?.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No interests selected
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
