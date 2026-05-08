"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComplianceStatusBadge } from "./compliance-status-badge"
import {
  AlertTriangle,
  Server,
  AlertCircle,
  Activity,
  Shield,
  ChevronRight,
  TrendingUp,
  Clock,
  FileText,
} from "lucide-react"

const recentViolations = [
  { id: "1", type: "SLA Override", entity: "INC0042781", time: "5 min ago", severity: "warning" as const },
  { id: "2", type: "Escalation Bypass", entity: "INC0042756", time: "12 min ago", severity: "critical" as const },
  { id: "3", type: "Unauthorized Edit", entity: "WF-AUTO-023", time: "25 min ago", severity: "violated" as const },
]

const impactedServices = [
  { name: "Payment Gateway", incidents: 3, status: "critical" },
  { name: "Core Database", incidents: 2, status: "warning" },
  { name: "Email Service", incidents: 1, status: "warning" },
]

const operationalWarnings = [
  { message: "High volume of configuration changes detected", time: "Last hour" },
  { message: "Multiple SLA overrides in short timeframe", time: "Last 2 hours" },
  { message: "Unusual access pattern detected", time: "Last 30 min" },
]

export function AuditContextPanel() {
  return (
    <div className="h-full overflow-y-auto space-y-4 p-4">
      {/* Compliance Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-[#E69F50]" />
            Compliance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Status</span>
            <ComplianceStatusBadge status="warning" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded bg-green-50 p-2">
              <p className="text-lg font-semibold text-green-700">94.2%</p>
              <p className="text-[10px] text-green-600">Compliant</p>
            </div>
            <div className="rounded bg-red-50 p-2">
              <p className="text-lg font-semibold text-red-700">12</p>
              <p className="text-[10px] text-red-600">Violations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Violations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Recent Violations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentViolations.map((violation) => (
              <div
                key={violation.id}
                className="flex items-center justify-between rounded-lg border p-2 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-medium">{violation.type}</p>
                  <p className="text-[10px] text-muted-foreground">{violation.entity} • {violation.time}</p>
                </div>
                <ComplianceStatusBadge status={violation.severity} showLabel={false} />
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            View All Violations
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Impacted Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Server className="h-4 w-4 text-muted-foreground" />
            Impacted Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {impactedServices.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    service.status === "critical" ? "bg-red-500" : "bg-amber-500"
                  }`} />
                  <span className="text-xs">{service.name}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {service.incidents} incidents
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operational Warnings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Operational Warnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {operationalWarnings.map((warning, index) => (
              <div
                key={index}
                className="rounded-lg border-l-2 border-l-amber-500 bg-amber-50/50 p-2"
              >
                <p className="text-xs text-foreground">{warning.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{warning.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Audit Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded bg-blue-50">
            <Activity className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-blue-700">+47% audit events</p>
              <p className="text-[10px] text-blue-600">vs. last week</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-green-50">
            <Clock className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs font-medium text-green-700">2.3h avg resolution</p>
              <p className="text-[10px] text-green-600">for governance alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded bg-purple-50">
            <FileText className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-xs font-medium text-purple-700">156 config changes</p>
              <p className="text-[10px] text-purple-600">this week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
