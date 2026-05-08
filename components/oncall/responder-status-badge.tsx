"use client"

import { cn } from "@/lib/utils"

type ResponderStatus = "available" | "busy" | "offline" | "escalated" | "in-major-incident" | "away" | "vacation" | "backup-only"

interface ResponderStatusBadgeProps {
  status: ResponderStatus
  showDot?: boolean
  className?: string
}

const statusConfig: Record<ResponderStatus, { label: string; bg: string; text: string; dot: string }> = {
  available: { label: "Available", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  busy: { label: "Busy", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  offline: { label: "Offline", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  escalated: { label: "Escalated", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  "in-major-incident": { label: "In Major Incident", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  away: { label: "Away", bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  vacation: { label: "Vacation", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "backup-only": { label: "Backup Only", bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
}

export function ResponderStatusBadge({ status, showDot = true, className }: ResponderStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />}
      {config.label}
    </span>
  )
}
