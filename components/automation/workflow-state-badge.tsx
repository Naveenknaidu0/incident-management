"use client"

import { cn } from "@/lib/utils"

type WorkflowState = "draft" | "active" | "paused" | "failed" | "archived"

interface WorkflowStateBadgeProps {
  state: WorkflowState
  className?: string
}

const stateStyles: Record<WorkflowState, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
  active: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  paused: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  archived: { bg: "bg-slate-50", text: "text-slate-500", dot: "bg-slate-400" },
}

const stateLabels: Record<WorkflowState, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  failed: "Failed",
  archived: "Archived",
}

export function WorkflowStateBadge({ state, className }: WorkflowStateBadgeProps) {
  const styles = stateStyles[state]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {stateLabels[state]}
    </div>
  )
}
