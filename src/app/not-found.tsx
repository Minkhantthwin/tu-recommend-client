import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
