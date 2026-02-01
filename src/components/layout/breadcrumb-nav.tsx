"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium capitalize">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    
    // Format the label
    const label = segment
      .replace(/-/g, " ")
      .replace(/\[.*\]/g, "Details");
    
    return {
      label,
      href: isLast ? undefined : href,
    };
  });
}
