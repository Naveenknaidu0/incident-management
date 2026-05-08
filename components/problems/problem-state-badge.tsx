"use client"

import { cn } from "@/lib/utils"

type ProblemState =
  | "new"
  | "under-investigation"
  | "root-cause-identified"
  | "permanent-fix-planned"
  | "monitoring"
  | "resolved"
  | "closed"

interface ProblemStateBadgeProps {
  state: ProblemState
  className?: string
}

const stateConfig: Record<ProblemState, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: "New", bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
  "under-investigation": { label: "Under Investigation", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "root-cause-identified": { label: "Root Cause Identified", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "permanent-fix-planned": { label: "Permanent Fix Planned", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  monitoring: { label: "Monitoring", bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500" },
  resolved: { label: "Resolved", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  closed: { label: "Closed", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
}

export function ProblemStateBadge({ state, className }: ProblemStateBadgeProps) {
  const config = stateConfig[state]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  )
}
