"use client"

import { cn } from "@/lib/utils"

type PagingStatus = "queued" | "delivered" | "acknowledged" | "failed" | "escalated"

interface PagingStatusBadgeProps {
  status: PagingStatus
  className?: string
}

const statusConfig: Record<PagingStatus, { label: string; bg: string; text: string }> = {
  queued: { label: "Queued", bg: "bg-slate-100", text: "text-slate-700" },
  delivered: { label: "Delivered", bg: "bg-blue-50", text: "text-blue-700" },
  acknowledged: { label: "Acknowledged", bg: "bg-green-50", text: "text-green-700" },
  failed: { label: "Failed", bg: "bg-red-50", text: "text-red-700" },
  escalated: { label: "Escalated", bg: "bg-orange-50", text: "text-orange-700" },
}

export function PagingStatusBadge({ status, className }: PagingStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  )
}
