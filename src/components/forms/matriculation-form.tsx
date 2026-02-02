"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/forms/form-input";
import { useMatriculation } from "@/hooks/use-matriculation";
import { CreateMatriculationInput } from "@/lib/api/endpoints/matriculation.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const matriculationSchema = z.object({
  examYear: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(2000).max(new Date().getFullYear())
  ),
  rollNumber: z.string().min(1, "Roll number is required"),
  schoolName: z.string().min(1, "School name is required"),
  schoolTownship: z.string().min(1, "Township is required"),
  schoolRegion: z.string().min(1, "Region is required"),
  myanmar: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100)
  ),
  english: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100)
  ),
  mathematics: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100)
  ),
  physics: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100)
  ),
  chemistry: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100)
  ),
  biology: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().min(0).max(100).optional()
  ),
});

type MatriculationFormValues = z.infer<typeof matriculationSchema>;

export function MatriculationForm() {
  const router = useRouter();
  const { matriculation, isLoading, createMatriculation, updateMatriculation, isSaving } = useMatriculation();

  const form = useForm<MatriculationFormValues>({
    resolver: zodResolver(matriculationSchema) as any,
    defaultValues: {
      examYear: new Date().getFullYear() - 1,
      rollNumber: "",
      schoolName: "",
      schoolTownship: "",
      schoolRegion: "",
      myanmar: undefined as any,
      english: undefined as any,
      mathematics: undefined as any,
      physics: undefined as any,
      chemistry: undefined as any,
      biology: undefined as any,
    },
  });

  useEffect(() => {
    if (matriculation) {
      form.reset({
        examYear: matriculation.examYear,
        rollNumber: matriculation.rollNumber,
        schoolName: matriculation.schoolName,
        schoolTownship: matriculation.schoolTownship,
        schoolRegion: matriculation.schoolRegion,
        myanmar: matriculation.myanmar,
        english: matriculation.english,
        mathematics: matriculation.mathematics,
        physics: matriculation.physics,
        chemistry: matriculation.chemistry,
        biology: matriculation.biology ?? undefined,
      });
    }
  }, [matriculation, form]);

  const onSubmit = (data: MatriculationFormValues) => {
    const payload: CreateMatriculationInput = {
      ...data,
      biology: data.biology,
    };

    if (matriculation) {
      updateMatriculation(payload, {
        onSuccess: () => router.push("/interests"),
      });
    } else {
      createMatriculation(payload, {
        onSuccess: () => router.push("/interests"),
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Exam Details</h3>
                <FormInput
                  label="Exam Year"
                  type="number"
                  placeholder="2024"
                  error={form.formState.errors.examYear?.message}
                  {...form.register("examYear")}
                />
                <FormInput
                  label="Roll Number"
                  placeholder="e.g. KaGa-12345"
                  error={form.formState.errors.rollNumber?.message}
                  {...form.register("rollNumber")}
                />
                <FormInput
                  label="School Name"
                  placeholder="e.g. BEHS (1) Yangon"
                  error={form.formState.errors.schoolName?.message}
                  {...form.register("schoolName")}
                />
                <FormInput
                  label="Township"
                  placeholder="e.g. Kamaryut"
                  error={form.formState.errors.schoolTownship?.message}
                  {...form.register("schoolTownship")}
                />
                <FormInput
                  label="Region/State"
                  placeholder="e.g. Yangon"
                  error={form.formState.errors.schoolRegion?.message}
                  {...form.register("schoolRegion")}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Subject Scores</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Myanmar"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.myanmar?.message}
                    {...form.register("myanmar")}
                  />
                  <FormInput
                    label="English"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.english?.message}
                    {...form.register("english")}
                  />
                  <FormInput
                    label="Mathematics"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.mathematics?.message}
                    {...form.register("mathematics")}
                  />
                  <FormInput
                    label="Physics"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.physics?.message}
                    {...form.register("physics")}
                  />
                  <FormInput
                    label="Chemistry"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.chemistry?.message}
                    {...form.register("chemistry")}
                  />
                  <FormInput
                    label="Biology (Optional)"
                    type="number"
                    min={0}
                    max={100}
                    error={form.formState.errors.biology?.message}
                    {...form.register("biology")}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {matriculation ? "Update & Continue" : "Save & Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
