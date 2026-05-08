import { cn } from "@/lib/utils"
import { AlertTriangle, AlertCircle, Minus, ChevronDown } from "lucide-react"

type PriorityType = "critical" | "high" | "medium" | "low"

interface PriorityBadgeProps {
  priority: PriorityType
  className?: string
  showLabel?: boolean
}

const priorityConfig: Record<PriorityType, { icon: React.ElementType; bg: string; text: string; label: string }> = {
  critical: { icon: AlertTriangle, bg: "bg-red-100", text: "text-red-700", label: "P1" },
  high: { icon: AlertCircle, bg: "bg-orange-100", text: "text-orange-700", label: "P2" },
  medium: { icon: Minus, bg: "bg-yellow-100", text: "text-yellow-700", label: "P3" },
  low: { icon: ChevronDown, bg: "bg-green-100", text: "text-green-700", label: "P4" },
}

export function PriorityBadge({ priority, className, showLabel = true }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold",
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && config.label}
    </span>
  )
}
