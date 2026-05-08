"use client"

import { cn } from "@/lib/utils"

type ArticleStatus = "draft" | "review" | "published" | "archived" | "deprecated"

interface ArticleStatusBadgeProps {
  status: ArticleStatus
  className?: string
}

const statusStyles: Record<ArticleStatus, { bg: string; text: string; dot: string }> = {
  draft: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
  review: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  published: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  archived: { bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400" },
  deprecated: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
}

const statusLabels: Record<ArticleStatus, string> = {
  draft: "Draft",
  review: "In Review",
  published: "Published",
  archived: "Archived",
  deprecated: "Deprecated",
}

export function ArticleStatusBadge({ status, className }: ArticleStatusBadgeProps) {
  const styles = statusStyles[status]
  const label = statusLabels[status]

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
      {label}
    </span>
  )
}
