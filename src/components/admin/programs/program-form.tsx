"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Program, ProgramInput } from "@/types/program.types";
import { Degree, ProgramStatus } from "@/types/enums";
import { useAdminUniversities } from "@/hooks/use-admin-universities";

const programFormSchema = z.object({
  universityId: z.number().min(1, { message: "University is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  nameMm: z.string().optional(),
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().optional(),
  descriptionMm: z.string().optional(),
  duration: z.preprocess((val) => Number(val), z.number().min(1, { message: "Duration must be at least 1 year" })),
  degree: z.nativeEnum(Degree, { message: "Degree is required" }),
  faculty: z.string().optional(),
  status: z.nativeEnum(ProgramStatus).default(ProgramStatus.ACTIVE),
  minScore: z.coerce.number().optional(),
  quota: z.coerce.number().optional(),
  // Requirements
  minTotalScore: z.coerce.number().optional(),
  myanmar: z.coerce.number().optional(),
  english: z.coerce.number().optional(),
  mathematics: z.coerce.number().optional(),
  physics: z.coerce.number().optional(),
  chemistry: z.coerce.number().optional(),
  biology: z.coerce.number().optional(),
  additionalRequirements: z.string().optional(),
});

type ProgramFormValues = {
  universityId: number;
  name: string;
  nameMm?: string;
  code: string;
  description?: string;
  descriptionMm?: string;
  duration: number;
  degree: Degree;
  faculty?: string;
  status: ProgramStatus;
  minScore?: number;
  quota?: number;
  // Requirements
  minTotalScore?: number;
  myanmar?: number;
  english?: number;
  mathematics?: number;
  physics?: number;
  chemistry?: number;
  biology?: number;
  additionalRequirements?: string;
};

interface ProgramFormProps {
  program?: Program | null;
  onSubmit: (data: ProgramInput) => void;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
}

export function ProgramForm({
  program,
  onSubmit,
  isSubmitting,
  title = "Program Details",
  description = "Enter the details for the program.",
}: ProgramFormProps) {
  const { universities, isLoading: isLoadingUniversities } = useAdminUniversities();

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema as any),
    defaultValues: {
      universityId: 0,
      name: "",
      nameMm: "",
      code: "",
      description: "",
      descriptionMm: "",
      duration: 4,
      degree: Degree.BACHELOR,
      faculty: "",
      status: ProgramStatus.ACTIVE,
      minScore: 0,
      quota: 0,
      minTotalScore: 0,
      myanmar: 0,
      english: 0,
      mathematics: 0,
      physics: 0,
      chemistry: 0,
      biology: 0,
      additionalRequirements: "",
    },
  });

  useEffect(() => {
    if (program) {
      const req = program.requirements?.[0];
      form.reset({
        universityId: program.universityId,
        name: program.name,
        nameMm: program.nameMm || "",
        code: program.code,
        description: program.description || "",
        descriptionMm: program.descriptionMm || "",
        duration: program.duration,
        degree: program.degree,
        faculty: program.faculty || "",
        status: program.status,
        minScore: program.minScore || 0,
        quota: program.quota || 0,
        minTotalScore: req?.minTotalScore || 0,
        myanmar: req?.myanmar || 0,
        english: req?.english || 0,
        mathematics: req?.mathematics || 0,
        physics: req?.physics || 0,
        chemistry: req?.chemistry || 0,
        biology: req?.biology || 0,
        additionalRequirements: req?.additionalRequirements || "",
      });
    }
  }, [program, form]);

  const handleSubmit = (data: ProgramFormValues) => {
    const {
      minTotalScore,
      myanmar,
      english,
      mathematics,
      physics,
      chemistry,
      biology,
      additionalRequirements,
      ...programData
    } = data;

    const payload: ProgramInput = {
      ...programData,
      requirements: {
        minTotalScore: minTotalScore || 0,
        myanmar,
        english,
        mathematics,
        physics,
        chemistry,
        biology,
        additionalRequirements,
      },
    };
    onSubmit(payload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="universityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                      disabled={isLoadingUniversities}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a university" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {universities?.data?.data?.map((uni) => (
                          <SelectItem key={uni.id} value={uni.id.toString()}>
                            {uni.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. BE-CE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Computer Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameMm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Myanmar)</FormLabel>
                    <FormControl>
                      <Input placeholder="Myanmar name" className="font-myanmar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Degree).map((degree) => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Years)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Faculty of Information Technology" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ProgramStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Score</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g. 400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quota</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g. 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minTotalScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Total Score Requirement</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 400" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="english"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min English Score</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mathematics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Mathematics Score</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Physics Score</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chemistry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Chemistry Score</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="biology"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Biology Score</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g. 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (English)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Program description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionMm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Myanmar)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Myanmar description" className="font-myanmar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {program ? "Update Program" : "Create Program"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
