"use client"

import { cn } from "@/lib/utils"
import { Clock, Pause, AlertTriangle } from "lucide-react"

interface SLACountdownProps {
  hours: number
  minutes: number
  seconds?: number
  state: "healthy" | "warning" | "critical" | "breached" | "paused"
  showProgress?: boolean
  progressPercent?: number
  compact?: boolean
  className?: string
}

export function SLACountdown({
  hours,
  minutes,
  seconds,
  state,
  showProgress = false,
  progressPercent = 0,
  compact = false,
  className,
}: SLACountdownProps) {
  const stateStyles = {
    healthy: {
      container: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-700",
      progress: "bg-emerald-500",
      icon: Clock,
    },
    warning: {
      container: "bg-amber-50 border-amber-200",
      text: "text-amber-700",
      progress: "bg-amber-500",
      icon: AlertTriangle,
    },
    critical: {
      container: "bg-red-50 border-red-200 animate-pulse",
      text: "text-red-700",
      progress: "bg-red-500",
      icon: AlertTriangle,
    },
    breached: {
      container: "bg-red-100 border-red-300",
      text: "text-red-800",
      progress: "bg-red-600",
      icon: AlertTriangle,
    },
    paused: {
      container: "bg-slate-100 border-slate-200",
      text: "text-slate-600",
      progress: "bg-slate-400",
      icon: Pause,
    },
  }

  const styles = stateStyles[state]
  const Icon = styles.icon

  const formatTime = (h: number, m: number, s?: number) => {
    const hStr = h.toString().padStart(2, "0")
    const mStr = m.toString().padStart(2, "0")
    if (s !== undefined) {
      const sStr = s.toString().padStart(2, "0")
      return `${hStr}:${mStr}:${sStr}`
    }
    return `${hStr}:${mStr}`
  }

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-mono font-medium border",
          styles.container,
          styles.text,
          className
        )}
      >
        <Icon className="h-3 w-3" />
        {state === "breached" ? "-" : ""}{formatTime(Math.abs(hours), Math.abs(minutes), seconds)}
      </span>
    )
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        styles.container,
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={cn("h-4 w-4", styles.text)} />
          <span className={cn("text-xs font-medium uppercase tracking-wide", styles.text)}>
            {state === "breached" ? "Overdue" : state === "paused" ? "Paused" : "Time Remaining"}
          </span>
        </div>
        <span className={cn("font-mono text-lg font-semibold tabular-nums", styles.text)}>
          {state === "breached" ? "-" : ""}{formatTime(Math.abs(hours), Math.abs(minutes), seconds)}
        </span>
      </div>
      {showProgress && (
        <div className="mt-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/50">
            <div
              className={cn("h-full rounded-full transition-all duration-300", styles.progress)}
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
