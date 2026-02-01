import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="border-b">
        <div className="container flex h-14 items-center">
          <Link href="/" className="font-bold">
            {siteConfig.name}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Simple footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
