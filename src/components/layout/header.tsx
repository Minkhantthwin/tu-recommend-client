"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

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
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Dashboard
          </Link>
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
          <Link
            href="/profile"
            className="p-2 hover:bg-accent rounded-md"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
