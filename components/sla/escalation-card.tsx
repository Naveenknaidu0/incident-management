"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Clock,
  Server,
  AlertTriangle,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react"

interface EscalationCardProps {
  incidentId: string
  incidentTitle: string
  slaBreached: string
  escalationOwner: {
    name: string
    initials: string
    role: string
  }
  impactedService: string
  businessImpact: "low" | "medium" | "high" | "critical"
  elapsedOverdue: string
  escalationLevel: number
  onContact?: () => void
  onView?: () => void
  className?: string
}

const impactStyles = {
  low: "text-emerald-700 bg-emerald-50",
  medium: "text-amber-700 bg-amber-50",
  high: "text-orange-700 bg-orange-50",
  critical: "text-red-700 bg-red-50",
}

const impactLabels = {
  low: "Low Impact",
  medium: "Medium Impact",
  high: "High Impact",
  critical: "Critical Impact",
}

export function EscalationCard({
  incidentId,
  incidentTitle,
  slaBreached,
  escalationOwner,
  impactedService,
  businessImpact,
  elapsedOverdue,
  escalationLevel,
  onContact,
  onView,
  className,
}: EscalationCardProps) {
  const levelColors = {
    1: "border-l-amber-500",
    2: "border-l-orange-500",
    3: "border-l-red-500",
    4: "border-l-red-700",
    5: "border-l-red-900",
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 border-l-4 transition-shadow hover:shadow-md",
        levelColors[escalationLevel as keyof typeof levelColors] || "border-l-amber-500",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/incidents/${incidentId}`}
              className="font-semibold text-[#0D3133] hover:text-[#E69F50] transition-colors"
            >
              {incidentId}
            </Link>
            <span className="inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700">
              L{escalationLevel}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{incidentTitle}</p>
        </div>
        <div className="flex items-center gap-1 text-red-600 bg-red-50 rounded px-2 py-1">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-mono font-medium">-{elapsedOverdue}</span>
        </div>
      </div>

      {/* SLA Info */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <span className="text-muted-foreground">SLA Breached:</span>
        <span className="font-medium">{slaBreached}</span>
      </div>

      {/* Details Grid */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm truncate">{impactedService}</span>
        </div>
        <div>
          <span className={cn(
            "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
            impactStyles[businessImpact]
          )}>
            {impactLabels[businessImpact]}
          </span>
        </div>
      </div>

      {/* Owner & Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-[#0D3133] text-white">
              {escalationOwner.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{escalationOwner.name}</span>
            <span className="text-xs text-muted-foreground">{escalationOwner.role}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onContact}
          >
            <Phone className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onContact}
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={onView}
            asChild
          >
            <Link href={`/incidents/${incidentId}`}>
              View <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
