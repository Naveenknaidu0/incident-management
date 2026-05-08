"use client"

import { cn } from "@/lib/utils"
import { Check, Clock, Send, AlertCircle, Eye, CheckCheck, Loader2 } from "lucide-react"

type DeliveryStatus = "queued" | "sending" | "delivered" | "failed" | "read" | "acknowledged"

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus
  className?: string
  showLabel?: boolean
}

const statusConfig: Record<DeliveryStatus, { label: string; bg: string; text: string; icon: typeof Check }> = {
  queued: { label: "Queued", bg: "bg-slate-100", text: "text-slate-700", icon: Clock },
  sending: { label: "Sending", bg: "bg-blue-50", text: "text-blue-700", icon: Loader2 },
  delivered: { label: "Delivered", bg: "bg-green-50", text: "text-green-700", icon: Check },
  failed: { label: "Failed", bg: "bg-red-50", text: "text-red-700", icon: AlertCircle },
  read: { label: "Read", bg: "bg-emerald-50", text: "text-emerald-700", icon: Eye },
  acknowledged: { label: "Acknowledged", bg: "bg-[#0D3133]/10", text: "text-[#0D3133]", icon: CheckCheck },
}

export function DeliveryStatusBadge({ status, className, showLabel = true }: DeliveryStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className={cn("h-3 w-3", status === "sending" && "animate-spin")} />
      {showLabel && config.label}
    </span>
  )
}
