import React from "react";
import { ProjectStatus } from "@/lib/supabase/types";
import { Check, Clock, Loader2, AlertCircle, FileVideo } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface JobWorkflowStepperProps {
  status: ProjectStatus;
  createdAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
  errorMessage?: string | null;
  inputAssetName?: string;
}

export function JobWorkflowStepper({
  status,
  createdAt,
  startedAt,
  completedAt,
  errorMessage,
  inputAssetName,
}: JobWorkflowStepperProps) {
  const steps = [
    {
      id: "input",
      title: "Input Asset",
      subtitle: inputAssetName || "Dataset Video",
      date: createdAt,
      icon: <FileVideo className="w-4 h-4" />,
      state: "done",
    },
    {
      id: "queued",
      title: "Queued",
      subtitle: "Waiting for GPU",
      date: createdAt,
      icon: <Clock className="w-4 h-4" />,
      state: status === "queued" ? "current" : "done",
    },
    {
      id: "processing",
      title: "Processing",
      subtitle: "3DGS Optimization",
      date: startedAt,
      icon: status === "processing" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Check className="w-4 h-4" />
      ),
      state:
        status === "processing"
          ? "current"
          : status === "completed"
          ? "done"
          : status === "failed"
          ? "failed"
          : "pending",
    },
    {
      id: "completed",
      title: status === "failed" ? "Failed" : "Completed",
      subtitle: status === "failed" ? "Execution error" : "3D Output Ready",
      date: completedAt,
      icon:
        status === "failed" ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Check className="w-4 h-4" />
        ),
      state:
        status === "completed"
          ? "done"
          : status === "failed"
          ? "failed"
          : "pending",
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const isDone = step.state === "done";
          const isCurrent = step.state === "current";
          const isFailed = step.state === "failed";

          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col p-4 rounded-lg border transition-all relative",
                isDone && "border-zinc-900 bg-white",
                isCurrent && "border-zinc-950 bg-zinc-900 text-white shadow-md",
                isFailed && "border-red-600 bg-red-50 text-red-950",
                step.state === "pending" && "border-zinc-200 bg-zinc-50/60 text-zinc-400"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-mono font-semibold",
                    isDone && "bg-zinc-900 border-zinc-900 text-white",
                    isCurrent && "bg-white border-white text-zinc-900",
                    isFailed && "bg-red-600 border-red-600 text-white",
                    step.state === "pending" && "bg-zinc-100 border-zinc-200 text-zinc-400"
                  )}
                >
                  {step.icon}
                </span>
                <span className="text-[11px] font-mono opacity-70">
                  STEP {idx + 1}/4
                </span>
              </div>

              <div className="font-semibold text-sm tracking-tight">{step.title}</div>
              <div
                className={cn(
                  "text-xs truncate mt-0.5",
                  isCurrent ? "text-zinc-300" : isFailed ? "text-red-700" : "text-zinc-500"
                )}
              >
                {step.subtitle}
              </div>

              {step.date && (
                <div
                  className={cn(
                    "text-[10px] font-mono mt-3 pt-2 border-t",
                    isCurrent ? "border-zinc-800 text-zinc-400" : "border-zinc-100 text-zinc-400"
                  )}
                >
                  {formatDate(step.date)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {status === "failed" && errorMessage && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Workflow Error Details:</div>
            <p className="font-mono text-xs mt-1 text-red-800 break-all">{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
