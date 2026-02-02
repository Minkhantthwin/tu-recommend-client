"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { FormInput } from "./form-input";
import { useAuth } from "@/components/providers/auth-provider";
import { register as registerApi } from "@/lib/api/endpoints/auth.api";

const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const getErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as { response?: { data?: { error?: string } } }).response;
      if (response?.data?.error) {
        return response.data.error;
      }
    }
    return "Something went wrong. Please try again.";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setIsLoading(true);
      const response = await registerApi(data);

      if (response.success && response.data?.user && response.data?.tokens) {
        login(
          response.data.user,
          response.data.tokens.accessToken,
          response.data.tokens.refreshToken
        );
        toast.success("Account created successfully");
        router.push("/matriculation");
      } else {
        toast.error(response.message || "Failed to register");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Email"
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email")}
        disabled={isLoading}
      />
      <FormInput
        label="Password"
        type="password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password")}
        disabled={isLoading}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </button>
    </form>
  );
}
