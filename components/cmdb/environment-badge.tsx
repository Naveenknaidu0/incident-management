"use client"

import { cn } from "@/lib/utils"

type Environment = "production" | "staging" | "qa" | "development" | "dr"

interface EnvironmentBadgeProps {
  environment: Environment
  className?: string
}

const envStyles: Record<Environment, { bg: string; text: string; label: string }> = {
  production: { bg: "bg-red-100", text: "text-red-800", label: "Production" },
  staging: { bg: "bg-amber-100", text: "text-amber-800", label: "Staging" },
  qa: { bg: "bg-blue-100", text: "text-blue-800", label: "QA" },
  development: { bg: "bg-slate-100", text: "text-slate-700", label: "Development" },
  dr: { bg: "bg-purple-100", text: "text-purple-800", label: "DR" },
}

export function EnvironmentBadge({ environment, className }: EnvironmentBadgeProps) {
  const styles = envStyles[environment]
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text,
        className
      )}
    >
      {styles.label}
    </span>
  )
}
