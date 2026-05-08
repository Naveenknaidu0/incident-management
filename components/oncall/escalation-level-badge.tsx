"use client"

import { cn } from "@/lib/utils"

type EscalationLevel = "L1" | "L2" | "L3" | "manager" | "executive"

interface EscalationLevelBadgeProps {
  level: EscalationLevel
  className?: string
}

const levelConfig: Record<EscalationLevel, { label: string; bg: string; text: string }> = {
  L1: { label: "L1", bg: "bg-blue-100", text: "text-blue-800" },
  L2: { label: "L2", bg: "bg-amber-100", text: "text-amber-800" },
  L3: { label: "L3", bg: "bg-orange-100", text: "text-orange-800" },
  manager: { label: "Manager", bg: "bg-purple-100", text: "text-purple-800" },
  executive: { label: "Executive", bg: "bg-red-100", text: "text-red-800" },
}

export function EscalationLevelBadge({ level, className }: EscalationLevelBadgeProps) {
  const config = levelConfig[level]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-semibold",
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  )
}
