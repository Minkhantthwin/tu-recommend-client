import { cn } from "@/lib/utils";
import { ApplicationStatus } from "@/types/enums";
import { APPLICATION_STATUS_LABELS } from "@/lib/constants";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusStyles: Record<ApplicationStatus, string> = {
  [ApplicationStatus.DRAFT]:
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  [ApplicationStatus.SUBMITTED]:
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  [ApplicationStatus.UNDER_REVIEW]:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  [ApplicationStatus.ACCEPTED]:
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  [ApplicationStatus.REJECTED]:
    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  [ApplicationStatus.WITHDRAWN]:
    "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}
