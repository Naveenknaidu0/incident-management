"use client"

import { cn } from "@/lib/utils"
import { Info, AlertTriangle, AlertCircle, Siren } from "lucide-react"

type MessagePriority = "informational" | "warning" | "critical" | "executive-critical"

interface MessagePriorityBadgeProps {
  priority: MessagePriority
  className?: string
}

const priorityConfig: Record<MessagePriority, { label: string; bg: string; text: string; border: string; icon: typeof Info }> = {
  informational: { label: "Informational", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: Info },
  warning: { label: "Warning", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: AlertTriangle },
  critical: { label: "Critical", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: AlertCircle },
  "executive-critical": { label: "Executive Critical", bg: "bg-[#0D3133]", text: "text-white", border: "border-[#0D3133]", icon: Siren },
}

export function MessagePriorityBadge({ priority, className }: MessagePriorityBadgeProps) {
  const config = priorityConfig[priority]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
