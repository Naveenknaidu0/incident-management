import { cn } from "@/lib/utils"

type StatusType =
  | "new"
  | "assigned"
  | "open"
  | "in-progress"
  | "pending"
  | "waiting-vendor"
  | "resolved"
  | "closed"
  | "escalated"
  | "major-incident"
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "operational"
  | "degraded"
  | "outage"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusStyles: Record<StatusType, { bg: string; text: string; dot: string }> = {
  new: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
  assigned: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  open: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "in-progress": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  pending: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  "waiting-vendor": { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  resolved: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  closed: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  escalated: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  "major-incident": { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-600" },
  critical: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-600" },
  high: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  medium: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  low: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  operational: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  degraded: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  outage: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
}

const statusLabels: Record<StatusType, string> = {
  new: "New",
  assigned: "Assigned",
  open: "Open",
  "in-progress": "In Progress",
  pending: "Pending",
  "waiting-vendor": "Waiting for Vendor",
  resolved: "Resolved",
  closed: "Closed",
  escalated: "Escalated",
  "major-incident": "Major Incident",
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = statusStyles[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        styles.bg,
        styles.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {statusLabels[status]}
    </span>
  )
}
