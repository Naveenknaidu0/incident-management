"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon: LucideIcon
  variant?: "default" | "critical" | "warning" | "success"
}

export function KPICard({ title, value, change, icon: Icon, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "border-border",
    critical: "border-l-4 border-l-[#DC2626] border-t-border border-r-border border-b-border",
    warning: "border-l-4 border-l-[#D97706] border-t-border border-r-border border-b-border",
    success: "border-l-4 border-l-[#059669] border-t-border border-r-border border-b-border",
  }

  const trendColors = {
    up: "text-[#059669]",
    down: "text-[#DC2626]",
    neutral: "text-muted-foreground",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm",
        variantStyles[variant]
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-card-foreground">{value}</span>
        {change && (
          <span className={cn("text-xs font-medium", trendColors[change.trend])}>
            {change.value}
          </span>
        )}
      </div>
    </motion.div>
  )
}
