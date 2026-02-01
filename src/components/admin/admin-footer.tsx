import { siteConfig } from "@/config/site";

export function AdminFooter() {
  return (
    <footer className="border-t bg-background py-4 px-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Admin Panel v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
