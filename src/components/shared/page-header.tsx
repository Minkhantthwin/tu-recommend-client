import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  titleMm?: string;
  description?: string;
  descriptionMm?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  titleMm,
  description,
  descriptionMm,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        {titleMm && (
          <p className="text-lg text-muted-foreground">{titleMm}</p>
        )}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {descriptionMm && (
          <p className="text-sm text-muted-foreground">{descriptionMm}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
