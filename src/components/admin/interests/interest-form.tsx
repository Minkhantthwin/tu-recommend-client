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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Interest, InterestInput } from "@/types/interest.types";

const interestFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type InterestFormValues = z.infer<typeof interestFormSchema>;

interface InterestFormProps {
  interest?: Interest | null;
  onSubmit: (data: InterestInput) => void;
  isSubmitting?: boolean;
  title?: string;
  description?: string;
}

export function InterestForm({
  interest,
  onSubmit,
  isSubmitting,
  title = "Interest Details",
  description = "Enter the details for the interest category.",
}: InterestFormProps) {
  const form = useForm<InterestFormValues>({
    resolver: zodResolver(interestFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (interest) {
      form.reset({
        name: interest.name,
      });
    }
  }, [interest, form]);

  const handleSubmit = (data: InterestFormValues) => {
    // Cast to InterestInput as we only use name for now
    onSubmit(data as unknown as InterestInput);
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Technology" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {interest ? "Save Changes" : "Create Interest"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
