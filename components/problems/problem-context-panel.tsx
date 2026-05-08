"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Link2,
  Server,
  AlertTriangle,
  CheckCircle,
  History,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

interface ProblemContextPanelProps {
  problemId: string
  className?: string
}

const relatedIncidents = [
  { id: "INC-4521", title: "API Gateway Timeout", priority: "critical", status: "resolved" },
  { id: "INC-4519", title: "Database Connection Pool Exhausted", priority: "high", status: "resolved" },
  { id: "INC-4515", title: "Payment Processing Delays", priority: "high", status: "closed" },
  { id: "INC-4512", title: "Order Service Degradation", priority: "medium", status: "closed" },
]

const impactedServices = [
  { name: "API Gateway", status: "recovered", incidents: 3 },
  { name: "Payment Service", status: "monitoring", incidents: 2 },
  { name: "Order Service", status: "recovered", incidents: 4 },
  { name: "Database Cluster", status: "recovered", incidents: 1 },
]

const dependencyRisks = [
  { service: "Redis Cache", risk: "medium", issue: "High memory usage" },
  { service: "Message Queue", risk: "low", issue: "Lag detected" },
]

const correctiveActions = [
  { id: "CA-001", title: "Increase connection pool size", status: "completed" },
  { id: "CA-002", title: "Add circuit breaker", status: "in-progress" },
  { id: "CA-003", title: "Implement retry logic", status: "pending" },
]

const outageHistory = [
  { date: "2024-01-15", duration: "45min", impact: "Partial Outage" },
  { date: "2024-01-08", duration: "2h 15min", impact: "Major Outage" },
  { date: "2023-12-22", duration: "30min", impact: "Degradation" },
]

export function ProblemContextPanel({ problemId, className }: ProblemContextPanelProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Related Incidents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-[#E69F50]" />
              Related Incidents
            </span>
            <Badge variant="secondary" className="text-xs">
              {relatedIncidents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {relatedIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between rounded-md bg-muted/50 px-2.5 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#0D3133]">{incident.id}</p>
                <p className="text-xs text-muted-foreground truncate">{incident.title}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button variant="link" size="sm" className="h-6 px-0 text-xs text-[#0D3133]">
            View all incidents <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Impacted Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Server className="h-4 w-4 text-purple-600" />
            Impacted Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {impactedServices.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-foreground">{service.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{service.incidents} incidents</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                    service.status === "recovered" && "bg-green-100 text-green-700",
                    service.status === "monitoring" && "bg-amber-100 text-amber-700"
                  )}
                >
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dependency Risks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Dependency Risks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {dependencyRisks.map((dep) => (
            <div
              key={dep.service}
              className="rounded-md border border-border p-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{dep.service}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    dep.risk === "high" && "border-red-200 text-red-700",
                    dep.risk === "medium" && "border-amber-200 text-amber-700",
                    dep.risk === "low" && "border-green-200 text-green-700"
                  )}
                >
                  {dep.risk}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{dep.issue}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Corrective Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Corrective Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {correctiveActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex-1 min-w-0">
                <span className="font-mono text-muted-foreground">{action.id}</span>
                <span className="mx-2 text-foreground">{action.title}</span>
              </div>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-medium shrink-0",
                  action.status === "completed" && "bg-green-100 text-green-700",
                  action.status === "in-progress" && "bg-blue-100 text-blue-700",
                  action.status === "pending" && "bg-slate-100 text-slate-700"
                )}
              >
                {action.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Outage History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <History className="h-4 w-4 text-slate-600" />
            Outage History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {outageHistory.map((outage, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-muted-foreground">{outage.date}</span>
              <span className="text-foreground">{outage.duration}</span>
              <span className="text-muted-foreground">{outage.impact}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
