"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SLACountdown } from "./sla-countdown"
import {
  AlertTriangle,
  TrendingUp,
  Users,
  RefreshCw,
  ArrowRight,
  Clock,
} from "lucide-react"

interface AtRiskIncident {
  id: string
  incidentId: string
  title: string
  remainingMinutes: number
  assignmentGroup: string
  riskType: "near_breach" | "predicted_escalation" | "recurring"
}

interface OverloadedGroup {
  name: string
  activeIncidents: number
  nearBreach: number
  capacity: number
}

interface RecurringViolation {
  service: string
  violations: number
  trend: "up" | "down" | "stable"
}

interface AtRiskPanelProps {
  nearBreachIncidents: AtRiskIncident[]
  predictedEscalations: AtRiskIncident[]
  overloadedGroups: OverloadedGroup[]
  recurringViolations: RecurringViolation[]
  className?: string
}

export function AtRiskPanel({
  nearBreachIncidents,
  predictedEscalations,
  overloadedGroups,
  recurringViolations,
  className,
}: AtRiskPanelProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Near Breach */}
      <Card className="border-amber-200">
        <CardHeader className="py-3 px-4 bg-amber-50/50">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-amber-700">
            <Clock className="h-4 w-4" />
            Near Breach ({nearBreachIncidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[200px] overflow-y-auto scrollbar-thin">
            {nearBreachIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 hover:bg-muted/30">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/incidents/${incident.incidentId}`}
                    className="text-sm font-medium text-[#0D3133] hover:text-[#E69F50] transition-colors"
                  >
                    {incident.incidentId}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">{incident.title}</p>
                </div>
                <SLACountdown
                  hours={0}
                  minutes={incident.remainingMinutes}
                  state="warning"
                  compact
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predicted Escalations */}
      <Card className="border-orange-200">
        <CardHeader className="py-3 px-4 bg-orange-50/50">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-orange-700">
            <TrendingUp className="h-4 w-4" />
            Predicted Escalations ({predictedEscalations.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[200px] overflow-y-auto scrollbar-thin">
            {predictedEscalations.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 hover:bg-muted/30">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/incidents/${incident.incidentId}`}
                    className="text-sm font-medium text-[#0D3133] hover:text-[#E69F50] transition-colors"
                  >
                    {incident.incidentId}
                  </Link>
                  <p className="text-xs text-muted-foreground">{incident.assignmentGroup}</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                  <Link href={`/incidents/${incident.incidentId}`}>
                    Act <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overloaded Assignment Groups */}
      <Card className="border-red-200">
        <CardHeader className="py-3 px-4 bg-red-50/50">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-red-700">
            <Users className="h-4 w-4" />
            Overloaded Groups ({overloadedGroups.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[200px] overflow-y-auto scrollbar-thin">
            {overloadedGroups.map((group) => (
              <div key={group.name} className="p-3 hover:bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{group.name}</span>
                  <span className="text-xs text-red-600 font-medium">
                    {group.activeIncidents}/{group.capacity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${Math.min(100, (group.activeIncidents / group.capacity) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {group.nearBreach} at risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recurring Violations */}
      <Card className="border-purple-200">
        <CardHeader className="py-3 px-4 bg-purple-50/50">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-purple-700">
            <RefreshCw className="h-4 w-4" />
            Recurring Violations ({recurringViolations.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[200px] overflow-y-auto scrollbar-thin">
            {recurringViolations.map((violation) => (
              <div key={violation.service} className="flex items-center justify-between p-3 hover:bg-muted/30">
                <span className="text-sm">{violation.service}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-purple-700">{violation.violations}</span>
                  {violation.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
