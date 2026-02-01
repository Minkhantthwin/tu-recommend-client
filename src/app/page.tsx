"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { UserRole } from "@/types/enums";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.role === UserRole.ADMIN) {
      router.replace("/admin");
      return;
    }

    router.replace("/dashboard");
  }, [isAuthenticated, router, user?.role]);

  return null;
}
