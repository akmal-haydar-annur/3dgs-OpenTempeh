import React from "react";
import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/lib/supabase/types";
import { Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: ProjectStatus | string;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const normalized = (status || "").toLowerCase() as ProjectStatus;

  const config: Record<
    ProjectStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    queued: {
      label: "QUEUED",
      bg: "bg-zinc-100",
      text: "text-zinc-800",
      border: "border-zinc-300",
      icon: <Clock className="w-3 h-3 text-zinc-600" />,
    },
    processing: {
      label: "PROCESSING",
      bg: "bg-zinc-900",
      text: "text-zinc-50",
      border: "border-zinc-950",
      icon: <Loader2 className="w-3 h-3 text-zinc-300 animate-spin" />,
    },
    completed: {
      label: "COMPLETED",
      bg: "bg-zinc-100",
      text: "text-zinc-950",
      border: "border-zinc-900 font-semibold",
      icon: <CheckCircle2 className="w-3 h-3 text-zinc-900" />,
    },
    failed: {
      label: "FAILED",
      bg: "bg-zinc-100",
      text: "text-zinc-900",
      border: "border-red-600 border-2",
      icon: <AlertCircle className="w-3 h-3 text-red-600" />,
    },
  };

  const item = config[normalized] || {
    label: (status || "UNKNOWN").toUpperCase(),
    bg: "bg-zinc-100",
    text: "text-zinc-800",
    border: "border-zinc-300",
    icon: <Clock className="w-3 h-3 text-zinc-600" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors",
        item.bg,
        item.text,
        item.border,
        className
      )}
    >
      {showIcon && item.icon}
      <span>{item.label}</span>
    </span>
  );
}

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "subtle";
}) {
  const styles = {
    default: "bg-zinc-900 text-zinc-50 border-transparent",
    outline: "border-zinc-300 text-zinc-800 bg-white",
    subtle: "bg-zinc-100 text-zinc-800 border-zinc-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border font-mono",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
