"use client";

import {
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  icon?: LucideIcon;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  icon: Icon = AlertTriangle,
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              variant === "destructive"
                ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                : "bg-primary/10 text-primary"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isLoading ? "Loading..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
