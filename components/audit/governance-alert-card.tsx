"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import { AlertTriangle, Clock, User, ChevronRight, ExternalLink } from "lucide-react"

interface GovernanceAlertCardProps {
  id: string
  title: string
  description: string
  severity: "warning" | "violated" | "critical"
  timestamp: string
  triggeredBy?: string
  entity?: string
  entityLink?: string
  onAcknowledge?: () => void
  onInvestigate?: () => void
}

export function GovernanceAlertCard({
  id,
  title,
  description,
  severity,
  timestamp,
  triggeredBy,
  entity,
  entityLink,
  onAcknowledge,
  onInvestigate,
}: GovernanceAlertCardProps) {
  const severityBorders = {
    warning: "border-l-amber-500",
    violated: "border-l-orange-500",
    critical: "border-l-red-500",
  }

  return (
    <Card className={`border-l-4 ${severityBorders[severity]}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <h4 className="text-sm font-medium text-foreground truncate">{title}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{description}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timestamp}
              </div>
              {triggeredBy && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {triggeredBy}
                </div>
              )}
              {entity && (
                <a
                  href={entityLink || "#"}
                  className="flex items-center gap-1 text-[#0D3133] hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  {entity}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <ComplianceStatusBadge status={severity} />
            <div className="flex gap-2">
              {onAcknowledge && (
                <Button variant="outline" size="sm" onClick={onAcknowledge} className="h-7 text-xs">
                  Acknowledge
                </Button>
              )}
              {onInvestigate && (
                <Button size="sm" onClick={onInvestigate} className="h-7 text-xs gap-1">
                  Investigate
                  <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
