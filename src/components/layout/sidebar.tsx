"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavItems, adminNavItems } from "@/config/nav";
import { useAuth } from "@/components/providers/auth-provider";
import { UserRole } from "@/types/enums";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  // Determine nav items based on user role or pathname if user is not available during hydration
  // On the server/initial render, user might be null, but we want to avoid hydration mismatch
  // If we are on an admin path, we likely want to show admin nav items
  const isAdminPath = pathname?.startsWith("/admin");
  
  // Use useEffect to handle client-side only logic to prevent hydration mismatch
  // but for initial render, we can guess based on path or default to main nav
  // The most robust way is to defer rendering user-specific items until mounted
  // or use a consistent default.
  
  const navItems =
    user?.role === UserRole.ADMIN || (!user && isAdminPath)
      ? adminNavItems
      : mainNavItems;

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link href="/" className="font-bold">
              TU Recommend
            </Link>
            <button
              onClick={onClose}
              className="p-1 hover:bg-accent rounded-md lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isDashboard = item.href === "/admin" || item.href === "/dashboard";
                const isActive = isDashboard 
                  ? pathname === item.href 
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
