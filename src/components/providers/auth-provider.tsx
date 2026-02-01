"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [initialAuth] = useState(() => {
    if (typeof window === "undefined") {
      return { user: null as User | null, accessToken: null as string | null, shouldClear: false };
    }

    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (!storedUser || !accessToken) {
      return { user: null as User | null, accessToken: accessToken ?? null, shouldClear: !!storedUser };
    }

    try {
      return {
        user: JSON.parse(storedUser) as User,
        accessToken,
        shouldClear: false,
      };
    } catch {
      return { user: null as User | null, accessToken: null as string | null, shouldClear: true };
    }
  });

  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [isLoading] = useState(false);

  const setAuthCookie = (accessToken: string) => {
    document.cookie = `tu-access-token=${accessToken}; Path=/; SameSite=Lax`;
  };

  const clearAuthCookie = () => {
    document.cookie = "tu-access-token=; Path=/; Max-Age=0; SameSite=Lax";
  };

  useEffect(() => {
    if (initialAuth.accessToken) {
      setAuthCookie(initialAuth.accessToken);
    }
    if (initialAuth.shouldClear) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      clearAuthCookie();
    }
  }, [initialAuth.accessToken, initialAuth.shouldClear]);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setUser(user);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    setAuthCookie(accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    clearAuthCookie();
    router.push("/login");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
