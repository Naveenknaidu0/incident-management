"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, XCircle, AlertOctagon } from "lucide-react"

type ComplianceStatus = "compliant" | "warning" | "violated" | "critical"

interface ComplianceStatusBadgeProps {
  status: ComplianceStatus
  showLabel?: boolean
  className?: string
}

const statusConfig: Record<ComplianceStatus, { label: string; icon: typeof CheckCircle; bg: string; text: string }> = {
  compliant: { label: "Compliant", icon: CheckCircle, bg: "bg-green-50", text: "text-green-700" },
  warning: { label: "Warning", icon: AlertTriangle, bg: "bg-amber-50", text: "text-amber-700" },
  violated: { label: "Violated", icon: XCircle, bg: "bg-orange-50", text: "text-orange-700" },
  critical: { label: "Critical", icon: AlertOctagon, bg: "bg-red-50", text: "text-red-700" },
}

export function ComplianceStatusBadge({ status, showLabel = true, className }: ComplianceStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", config.bg, config.text, className)}>
      <Icon className="h-3.5 w-3.5" />
      {showLabel && config.label}
    </span>
  )
}
