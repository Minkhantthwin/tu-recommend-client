"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="mr-2 p-2 hover:bg-accent rounded-md lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        {/* Main nav - hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/universities"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/universities")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Universities
          </Link>
          <Link
            href="/programs"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/programs")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Programs
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <button className="p-2 hover:bg-accent rounded-md">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-accent rounded-md flex items-center gap-2"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95">
                <Link
                  href="/profile"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <div className="my-1 h-px bg-muted" />
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
