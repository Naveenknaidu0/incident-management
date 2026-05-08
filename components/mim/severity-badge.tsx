import { cn } from "@/lib/utils"

type SeverityLevel = "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4"

interface SeverityBadgeProps {
  severity: SeverityLevel
  className?: string
  size?: "sm" | "md" | "lg"
}

const severityConfig: Record<SeverityLevel, { label: string; bg: string; text: string; border: string }> = {
  "SEV-1": {
    label: "SEV-1 Critical",
    bg: "bg-red-600",
    text: "text-white",
    border: "border-red-700",
  },
  "SEV-2": {
    label: "SEV-2 High",
    bg: "bg-orange-500",
    text: "text-white",
    border: "border-orange-600",
  },
  "SEV-3": {
    label: "SEV-3 Medium",
    bg: "bg-amber-500",
    text: "text-white",
    border: "border-amber-600",
  },
  "SEV-4": {
    label: "SEV-4 Low",
    bg: "bg-[#73847B]",
    text: "text-white",
    border: "border-[#5a6961]",
  },
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
}

export function SeverityBadge({ severity, className, size = "md" }: SeverityBadgeProps) {
  const config = severityConfig[severity]

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded border uppercase tracking-wide",
        config.bg,
        config.text,
        config.border,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  )
}
