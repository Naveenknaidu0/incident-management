"use client"

import { cn } from "@/lib/utils"

export type SLAState = "active" | "warning" | "paused" | "breached" | "escalated" | "completed"

interface SLAStateBadgeProps {
  state: SLAState
  className?: string
}

const stateStyles: Record<SLAState, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  paused: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  breached: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-600" },
  escalated: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  completed: { bg: "bg-[#0D3133]/5", text: "text-[#0D3133]", dot: "bg-[#0D3133]" },
}

const stateLabels: Record<SLAState, string> = {
  active: "Active",
  warning: "Warning",
  paused: "Paused",
  breached: "Breached",
  escalated: "Escalated",
  completed: "Completed",
}

export function SLAStateBadge({ state, className }: SLAStateBadgeProps) {
  const styles = stateStyles[state]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {stateLabels[state]}
    </span>
  )
}
