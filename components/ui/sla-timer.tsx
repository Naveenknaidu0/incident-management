"use client"

import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

interface SLATimerProps {
  remaining: string
  status: "safe" | "warning" | "breach" | "breached" | "paused"
  className?: string
}

export function SLATimer({ remaining, status, className }: SLATimerProps) {
  const statusStyles = {
    safe: "text-green-600 bg-green-50",
    warning: "text-amber-600 bg-amber-50",
    breach: "text-red-600 bg-red-50 animate-pulse",
    breached: "text-red-800 bg-red-100",
    paused: "text-slate-600 bg-slate-100",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-mono font-medium",
        statusStyles[status],
        className
      )}
    >
      <Clock className="h-3 w-3" />
      {remaining}
    </span>
  )
}
