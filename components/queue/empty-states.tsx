"use client"

import { Button } from "@/components/ui/button"
import {
  Inbox,
  Search,
  CheckCircle,
  Plus,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react"

interface EmptyStateProps {
  variant: "no-incidents" | "no-results" | "no-breaches"
  onAction?: () => void
}

export function EmptyState({ variant, onAction }: EmptyStateProps) {
  const content = {
    "no-incidents": {
      icon: Inbox,
      title: "No incidents in queue",
      description: "There are no incidents matching your current view. Create a new incident or adjust your filters.",
      actionLabel: "Create Incident",
      actionIcon: Plus,
    },
    "no-results": {
      icon: Search,
      title: "No results found",
      description: "We couldn't find any incidents matching your search criteria. Try adjusting your filters or search terms.",
      actionLabel: "Clear Filters",
      actionIcon: SlidersHorizontal,
    },
    "no-breaches": {
      icon: CheckCircle,
      title: "No SLA breaches",
      description: "Great news! All incidents are within their SLA targets. Keep up the excellent work.",
      actionLabel: "Refresh",
      actionIcon: RefreshCw,
    },
  }

  const { icon: Icon, title, description, actionLabel, actionIcon: ActionIcon } = content[variant]

  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-6 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} className="mt-6 gap-2 bg-[#0D3133] hover:bg-[#0D3133]/90">
          <ActionIcon className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
