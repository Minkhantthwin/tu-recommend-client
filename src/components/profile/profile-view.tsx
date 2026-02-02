"use client";

import { UserProfile } from "@/types/user.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Phone, User as UserIcon, Calendar, Briefcase, Mail } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface ProfileViewProps {
  profile: UserProfile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-6">
      {/* Header Card with Photo and Basic Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-muted bg-muted flex items-center justify-center">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.nameEnglish || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{profile.nameEnglish}</h2>
                  <p className="text-lg text-muted-foreground font-medium">{profile.nameMyanmar}</p>
                </div>
                <Button asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span className="font-medium text-foreground mr-2">NRC:</span> {profile.nrc}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="font-medium text-foreground mr-2">DOB:</span> 
                  {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "-"}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="font-medium text-foreground mr-2">Gender:</span> {profile.gender}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="font-medium text-foreground mr-2">Religion:</span> {profile.religion}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p>{profile.phone}</p>
              </div>
              {profile.alternatePhone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alternate Phone</p>
                  <p>{profile.alternatePhone}</p>
                </div>
              )}
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  <MapPin className="mr-1 h-3 w-3" /> Permanent Address
                </p>
                <p>{profile.permanentAddress}</p>
                <p>{profile.permanentTownship}, {profile.permanentRegion}</p>
              </div>
              {profile.currentAddress && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <MapPin className="mr-1 h-3 w-3" /> Current Address
                  </p>
                  <p>{profile.currentAddress}</p>
                  <p>{profile.currentTownship}, {profile.currentRegion}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Parent Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Father</h4>
              <div className="space-y-1 pl-2 border-l-2 border-muted">
                <p><span className="text-muted-foreground text-sm">Name:</span> {profile.fatherName}</p>
                {profile.fatherNrc && <p><span className="text-muted-foreground text-sm">NRC:</span> {profile.fatherNrc}</p>}
                {profile.fatherOccupation && <p><span className="text-muted-foreground text-sm">Occupation:</span> {profile.fatherOccupation}</p>}
                {profile.fatherPhone && <p><span className="text-muted-foreground text-sm">Phone:</span> {profile.fatherPhone}</p>}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Mother</h4>
              <div className="space-y-1 pl-2 border-l-2 border-muted">
                <p><span className="text-muted-foreground text-sm">Name:</span> {profile.motherName}</p>
                {profile.motherNrc && <p><span className="text-muted-foreground text-sm">NRC:</span> {profile.motherNrc}</p>}
                {profile.motherOccupation && <p><span className="text-muted-foreground text-sm">Occupation:</span> {profile.motherOccupation}</p>}
                {profile.motherPhone && <p><span className="text-muted-foreground text-sm">Phone:</span> {profile.motherPhone}</p>}
              </div>
            </div>

            {(profile.guardianName || profile.guardianRelation) && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Guardian</h4>
                  <div className="space-y-1 pl-2 border-l-2 border-muted">
                    {profile.guardianName && <p><span className="text-muted-foreground text-sm">Name:</span> {profile.guardianName}</p>}
                    {profile.guardianRelation && <p><span className="text-muted-foreground text-sm">Relationship:</span> {profile.guardianRelation}</p>}
                    {profile.guardianPhone && <p><span className="text-muted-foreground text-sm">Phone:</span> {profile.guardianPhone}</p>}
                    {profile.guardianAddress && <p><span className="text-muted-foreground text-sm">Address:</span> {profile.guardianAddress}</p>}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Details */}
      <Card>
        <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Ethnicity</p>
                    <p>{profile.ethnicity}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                    <p>{profile.nationality}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Marital Status</p>
                    <p>{profile.maritalStatus}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
