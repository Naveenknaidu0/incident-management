"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"

interface SLAKPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
    label?: string
  }
  variant?: "default" | "success" | "warning" | "danger" | "info"
  icon?: LucideIcon
  className?: string
}

export function SLAKPICard({
  title,
  value,
  subtitle,
  trend,
  variant = "default",
  icon: Icon,
  className,
}: SLAKPICardProps) {
  const variantStyles = {
    default: {
      container: "bg-card border-border",
      icon: "text-[#73847B] bg-[#73847B]/10",
      value: "text-foreground",
    },
    success: {
      container: "bg-card border-emerald-200",
      icon: "text-emerald-600 bg-emerald-50",
      value: "text-emerald-700",
    },
    warning: {
      container: "bg-card border-amber-200",
      icon: "text-amber-600 bg-amber-50",
      value: "text-amber-700",
    },
    danger: {
      container: "bg-card border-red-200",
      icon: "text-red-600 bg-red-50",
      value: "text-red-700",
    },
    info: {
      container: "bg-card border-[#0D3133]/20",
      icon: "text-[#0D3133] bg-[#0D3133]/10",
      value: "text-[#0D3133]",
    },
  }

  const trendStyles = {
    up: { color: "text-emerald-600", Icon: TrendingUp },
    down: { color: "text-red-600", Icon: TrendingDown },
    neutral: { color: "text-slate-500", Icon: Minus },
  }

  const styles = variantStyles[variant]
  const TrendIcon = trend ? trendStyles[trend.direction].Icon : null

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-shadow hover:shadow-sm",
        styles.container,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground truncate">
            {title}
          </p>
          <p className={cn("mt-1 text-2xl font-semibold tabular-nums", styles.value)}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
          {trend && TrendIcon && (
            <div className={cn("mt-2 flex items-center gap-1 text-xs", trendStyles[trend.direction].color)}>
              <TrendIcon className="h-3 w-3" />
              <span className="font-medium">{trend.value}%</span>
              {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("rounded-lg p-2", styles.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}
