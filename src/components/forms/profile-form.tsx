"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormInput } from "@/components/forms/form-input";
import { FormSelect } from "@/components/forms/form-select";
import { FileUpload } from "@/components/ui/file-upload";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useProfile } from "@/hooks/use-profile";
import { CreateUserProfileInput } from "@/lib/api/endpoints/user.api";

// Schema definition based on backend validation
const profileSchema = z.object({
  // Personal Information
  nameMyanmar: z.string().min(1, "Myanmar name is required"),
  nameEnglish: z.string().min(1, "English name is required"),
  nrc: z.string().min(1, "NRC is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  religion: z.enum(["BUDDHIST", "CHRISTIAN", "HINDU", "ISLAM", "OTHER"]),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  nationality: z.string().optional().default("Myanmar"),
  maritalStatus: z.enum(["SINGLE", "MARRIED"]).optional().default("SINGLE"),

  // Contact Information
  phone: z.string().min(1, "Phone number is required"),
  alternatePhone: z.string().optional(),

  // Permanent Address
  permanentAddress: z.string().min(1, "Permanent address is required"),
  permanentTownship: z.string().min(1, "Permanent township is required"),
  permanentRegion: z.string().min(1, "Permanent region is required"),

  // Current Address
  currentAddress: z.string().optional(),
  currentTownship: z.string().optional(),
  currentRegion: z.string().optional(),

  // Parent Information
  fatherName: z.string().min(1, "Father name is required"),
  fatherNrc: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherPhone: z.string().optional(),

  motherName: z.string().min(1, "Mother name is required"),
  motherNrc: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherPhone: z.string().optional(),

  // Guardian Information
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianAddress: z.string().optional(),

  // Photo
  photoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { profile, isLoading, createProfile, updateProfile, isSaving } = useProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: {
      nameMyanmar: "",
      nameEnglish: "",
      nrc: "",
      dateOfBirth: "",
      gender: "MALE",
      religion: "BUDDHIST",
      ethnicity: "",
      nationality: "Myanmar",
      maritalStatus: "SINGLE",
      phone: "",
      alternatePhone: "",
      permanentAddress: "",
      permanentTownship: "",
      permanentRegion: "",
      currentAddress: "",
      currentTownship: "",
      currentRegion: "",
      fatherName: "",
      fatherNrc: "",
      fatherOccupation: "",
      fatherPhone: "",
      motherName: "",
      motherNrc: "",
      motherOccupation: "",
      motherPhone: "",
      guardianName: "",
      guardianRelation: "",
      guardianPhone: "",
      guardianAddress: "",
      photoUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        nameMyanmar: profile.nameMyanmar || "",
        nameEnglish: profile.nameEnglish || "",
        nrc: profile.nrc || "",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
        gender: (profile.gender as "MALE" | "FEMALE") || "MALE",
        religion: (profile.religion as "BUDDHIST" | "CHRISTIAN" | "HINDU" | "ISLAM" | "OTHER") || "BUDDHIST",
        ethnicity: profile.ethnicity || "",
        nationality: profile.nationality || "Myanmar",
        maritalStatus: (profile.maritalStatus as "SINGLE" | "MARRIED") || "SINGLE",
        phone: profile.phone || "",
        alternatePhone: profile.alternatePhone || "",
        permanentAddress: profile.permanentAddress || "",
        permanentTownship: profile.permanentTownship || "",
        permanentRegion: profile.permanentRegion || "",
        currentAddress: profile.currentAddress || "",
        currentTownship: profile.currentTownship || "",
        currentRegion: profile.currentRegion || "",
        fatherName: profile.fatherName || "",
        fatherNrc: profile.fatherNrc || "",
        fatherOccupation: profile.fatherOccupation || "",
        fatherPhone: profile.fatherPhone || "",
        motherName: profile.motherName || "",
        motherNrc: profile.motherNrc || "",
        motherOccupation: profile.motherOccupation || "",
        motherPhone: profile.motherPhone || "",
        guardianName: profile.guardianName || "",
        guardianRelation: profile.guardianRelation || "",
        guardianPhone: profile.guardianPhone || "",
        guardianAddress: profile.guardianAddress || "",
        photoUrl: profile.photoUrl || "",
      });
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormValues) => {
    // Clean up empty strings to undefined for optional fields if needed, 
    // but the schema allows optional strings. 
    // However, backend might expect null or undefined for optional fields.
    // Let's pass as is, assuming API handles it.
    
    // Specifically handle date
    const payload: CreateUserProfileInput = {
      ...data,
      // Ensure optional fields are handled correctly
      alternatePhone: data.alternatePhone || undefined,
      currentAddress: data.currentAddress || undefined,
      currentTownship: data.currentTownship || undefined,
      currentRegion: data.currentRegion || undefined,
      fatherNrc: data.fatherNrc || undefined,
      fatherOccupation: data.fatherOccupation || undefined,
      fatherPhone: data.fatherPhone || undefined,
      motherNrc: data.motherNrc || undefined,
      motherOccupation: data.motherOccupation || undefined,
      motherPhone: data.motherPhone || undefined,
      guardianName: data.guardianName || undefined,
      guardianRelation: data.guardianRelation || undefined,
      guardianPhone: data.guardianPhone || undefined,
      guardianAddress: data.guardianAddress || undefined,
      photoUrl: data.photoUrl || undefined,
    };

    if (profile) {
      updateProfile(payload);
    } else {
      createProfile(payload);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please fill in your details accurately. This information will be used for your university applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Photo Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Photo</h3>
              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="/upload/profile"
                        fieldName="photo"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  label="Name (Myanmar)"
                  placeholder="မောင်မောင်"
                  error={form.formState.errors.nameMyanmar?.message}
                  {...form.register("nameMyanmar")}
                />
                <FormInput
                  label="Name (English)"
                  placeholder="Mg Mg"
                  error={form.formState.errors.nameEnglish?.message}
                  {...form.register("nameEnglish")}
                />
                <FormInput
                  label="NRC No."
                  placeholder="12/Kamaya(N)123456"
                  error={form.formState.errors.nrc?.message}
                  {...form.register("nrc")}
                />
                <FormInput
                  label="Date of Birth"
                  type="date"
                  error={form.formState.errors.dateOfBirth?.message}
                  {...form.register("dateOfBirth")}
                />
                <FormSelect
                  label="Gender"
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                  ]}
                  error={form.formState.errors.gender?.message}
                  {...form.register("gender")}
                />
                <FormSelect
                  label="Religion"
                  options={[
                    { label: "Buddhist", value: "BUDDHIST" },
                    { label: "Christian", value: "CHRISTIAN" },
                    { label: "Hindu", value: "HINDU" },
                    { label: "Islam", value: "ISLAM" },
                    { label: "Other", value: "OTHER" },
                  ]}
                  error={form.formState.errors.religion?.message}
                  {...form.register("religion")}
                />
                <FormInput
                  label="Ethnicity"
                  placeholder="Bamar"
                  error={form.formState.errors.ethnicity?.message}
                  {...form.register("ethnicity")}
                />
                <FormInput
                  label="Nationality"
                  placeholder="Myanmar"
                  error={form.formState.errors.nationality?.message}
                  {...form.register("nationality")}
                />
                <FormSelect
                  label="Marital Status"
                  options={[
                    { label: "Single", value: "SINGLE" },
                    { label: "Married", value: "MARRIED" },
                  ]}
                  error={form.formState.errors.maritalStatus?.message}
                  {...form.register("maritalStatus")}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  label="Phone Number"
                  placeholder="09123456789"
                  error={form.formState.errors.phone?.message}
                  {...form.register("phone")}
                />
                <FormInput
                  label="Alternate Phone (Optional)"
                  placeholder="09123456789"
                  error={form.formState.errors.alternatePhone?.message}
                  {...form.register("alternatePhone")}
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Permanent Address</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-3">
                        <FormInput
                        label="Address"
                        placeholder="No. 123, Bogyoke Road"
                        error={form.formState.errors.permanentAddress?.message}
                        {...form.register("permanentAddress")}
                        />
                    </div>
                    <FormInput
                    label="Township"
                    placeholder="Kamaryut"
                    error={form.formState.errors.permanentTownship?.message}
                    {...form.register("permanentTownship")}
                    />
                    <FormInput
                    label="Region/State"
                    placeholder="Yangon"
                    error={form.formState.errors.permanentRegion?.message}
                    {...form.register("permanentRegion")}
                    />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Current Address (If different)</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-3">
                        <FormInput
                        label="Address"
                        placeholder="No. 123, Bogyoke Road"
                        error={form.formState.errors.currentAddress?.message}
                        {...form.register("currentAddress")}
                        />
                    </div>
                    <FormInput
                    label="Township"
                    placeholder="Kamaryut"
                    error={form.formState.errors.currentTownship?.message}
                    {...form.register("currentTownship")}
                    />
                    <FormInput
                    label="Region/State"
                    placeholder="Yangon"
                    error={form.formState.errors.currentRegion?.message}
                    {...form.register("currentRegion")}
                    />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Parent Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Father */}
                <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Father's Details</h4>
                    <FormInput
                    label="Name"
                    error={form.formState.errors.fatherName?.message}
                    {...form.register("fatherName")}
                    />
                    <FormInput
                    label="NRC"
                    error={form.formState.errors.fatherNrc?.message}
                    {...form.register("fatherNrc")}
                    />
                    <FormInput
                    label="Occupation"
                    error={form.formState.errors.fatherOccupation?.message}
                    {...form.register("fatherOccupation")}
                    />
                    <FormInput
                    label="Phone"
                    error={form.formState.errors.fatherPhone?.message}
                    {...form.register("fatherPhone")}
                    />
                </div>
                {/* Mother */}
                <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Mother's Details</h4>
                    <FormInput
                    label="Name"
                    error={form.formState.errors.motherName?.message}
                    {...form.register("motherName")}
                    />
                    <FormInput
                    label="NRC"
                    error={form.formState.errors.motherNrc?.message}
                    {...form.register("motherNrc")}
                    />
                    <FormInput
                    label="Occupation"
                    error={form.formState.errors.motherOccupation?.message}
                    {...form.register("motherOccupation")}
                    />
                    <FormInput
                    label="Phone"
                    error={form.formState.errors.motherPhone?.message}
                    {...form.register("motherPhone")}
                    />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Guardian Information (Optional)</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  label="Guardian Name"
                  error={form.formState.errors.guardianName?.message}
                  {...form.register("guardianName")}
                />
                <FormInput
                  label="Relationship"
                  placeholder="Uncle, Aunt, etc."
                  error={form.formState.errors.guardianRelation?.message}
                  {...form.register("guardianRelation")}
                />
                <FormInput
                  label="Phone"
                  error={form.formState.errors.guardianPhone?.message}
                  {...form.register("guardianPhone")}
                />
                <FormInput
                  label="Address"
                  error={form.formState.errors.guardianAddress?.message}
                  {...form.register("guardianAddress")}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving} size="lg">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {profile ? "Update Profile" : "Create Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
