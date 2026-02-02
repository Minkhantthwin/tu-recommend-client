
"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { University, UniversityInput } from "@/types/university.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"

const universityFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  nameMyanmar: z.string().optional().or(z.literal('')),
  code: z.string().optional().or(z.literal('')),
  location: z.string().min(1, { message: "Location is required" }),
  region: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  photoUrl: z.string().optional().or(z.literal('')),
  logoUrl: z.string().optional().or(z.literal('')),
})

type UniversityFormValues = z.infer<typeof universityFormSchema>

interface UniversityFormProps {
  university?: University | null
  onSubmit: (data: UniversityInput) => void
  isSubmitting?: boolean
  title?: string
  description?: string
}

export function UniversityForm({
  university,
  onSubmit,
  isSubmitting,
  title = "University Details",
  description = "Enter the details for the university."
}: UniversityFormProps) {
  const form = useForm<UniversityFormValues>({
    resolver: zodResolver(universityFormSchema),
    defaultValues: {
      name: "",
      nameMyanmar: "",
      code: "",
      location: "",
      region: "",
      description: "",
      photoUrl: "",
      logoUrl: "",
    },
  })

  useEffect(() => {
    if (university) {
      form.reset({
        name: university.name,
        nameMyanmar: university.nameMyanmar || "",
        code: university.code || "",
        location: university.location,
        region: university.region || "",
        description: university.description || "",
        photoUrl: university.photoUrl || "",
        logoUrl: university.logoUrl || "",
      })
    }
  }, [university, form])

  const handleSubmit = (data: UniversityFormValues) => {
    // Filter out empty strings for optional fields
    const cleanedData: any = { ...data };
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === "") {
        delete cleanedData[key];
      }
    });
    onSubmit(cleanedData as UniversityInput)
  }

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (English)</FormLabel>
                    <FormControl>
                      <Input placeholder="Technological University (Mandalay)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameMyanmar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Myanmar)</FormLabel>
                    <FormControl>
                      <Input placeholder="နည်းပညာတက္ကသိုလ်(မန္တလေး)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Code</FormLabel>
                    <FormControl>
                      <Input placeholder="TU-MDY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region/State</FormLabel>
                    <FormControl>
                      <Input placeholder="Mandalay Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location/Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Patheingyi Township, Mandalay" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter university description..." 
                      className="resize-none min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Photo</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="/upload/university/photo"
                        fieldName="photo"
                        value={field.value}
                        onChange={field.onChange}
                        label="Upload Cover Photo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="/upload/university/logo"
                        fieldName="logo"
                        value={field.value}
                        onChange={field.onChange}
                        label="Upload Logo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {university ? "Save Changes" : "Create University"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
