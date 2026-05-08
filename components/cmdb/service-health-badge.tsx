"use client"

import { cn } from "@/lib/utils"

type HealthStatus = "operational" | "degraded" | "partial-outage" | "major-outage" | "maintenance"

interface ServiceHealthBadgeProps {
  status: HealthStatus
  showLabel?: boolean
  size?: "sm" | "md"
  className?: string
}

const healthStyles: Record<HealthStatus, { bg: string; text: string; dot: string; label: string }> = {
  operational: { 
    bg: "bg-green-50", 
    text: "text-green-700", 
    dot: "bg-green-500",
    label: "Operational"
  },
  degraded: { 
    bg: "bg-amber-50", 
    text: "text-amber-700", 
    dot: "bg-amber-500",
    label: "Degraded"
  },
  "partial-outage": { 
    bg: "bg-orange-50", 
    text: "text-orange-700", 
    dot: "bg-orange-500",
    label: "Partial Outage"
  },
  "major-outage": { 
    bg: "bg-red-50", 
    text: "text-red-700", 
    dot: "bg-red-600",
    label: "Major Outage"
  },
  maintenance: { 
    bg: "bg-blue-50", 
    text: "text-blue-700", 
    dot: "bg-blue-500",
    label: "Maintenance"
  },
}

export function ServiceHealthBadge({ 
  status, 
  showLabel = true, 
  size = "sm",
  className 
}: ServiceHealthBadgeProps) {
  const styles = healthStyles[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        styles.bg,
        styles.text,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        className
      )}
    >
      <span 
        className={cn(
          "rounded-full",
          styles.dot,
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
          status === "major-outage" && "animate-pulse"
        )} 
      />
      {showLabel && styles.label}
    </span>
  )
}
