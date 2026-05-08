"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface AutomationKPICardProps {
  title: string
  value: string | number
  trend?: { value: number; label: string }
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function AutomationKPICard({
  title,
  value,
  trend,
  icon: Icon,
  variant = "default",
  className,
}: AutomationKPICardProps) {
  const variantStyles = {
    default: {
      bg: "bg-card",
      icon: "text-[#73847B] bg-[#73847B]/10",
    },
    success: {
      bg: "bg-card",
      icon: "text-green-600 bg-green-50",
    },
    warning: {
      bg: "bg-card",
      icon: "text-amber-600 bg-amber-50",
    },
    danger: {
      bg: "bg-card",
      icon: "text-red-600 bg-red-50",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-4",
        styles.bg,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-[#0D3133]">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.value >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-2", styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
