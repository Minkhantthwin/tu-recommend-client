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
import { login as loginApi } from "@/lib/api/endpoints/auth.api";
import { UserRole } from "@/types/enums";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
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
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      const response = await loginApi(data);
      
      if (response.success && response.data?.user && response.data?.tokens) {
        login(
          response.data.user,
          response.data.tokens.accessToken,
          response.data.tokens.refreshToken
        );
        toast.success("Logged in successfully");
        if (response.data.user.role === UserRole.ADMIN) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        toast.error(response.message || "Failed to login");
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
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </button>
    </form>
  );
}
