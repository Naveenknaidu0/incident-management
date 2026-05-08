"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  GitBranch,
  Bell,
  AlertTriangle,
  Activity,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

interface TraceabilityPanelProps {
  entityId: string
  entityType: "incident" | "workflow" | "sla" | "configuration"
}

const mockRelatedIncidents = [
  { id: "INC0042756", title: "Related API outage", status: "resolved" },
  { id: "INC0042701", title: "Previous occurrence", status: "closed" },
]

const mockImpactedWorkflows = [
  { id: "WF-AUTO-023", name: "Critical Escalation", status: "active" },
  { id: "WF-AUTO-045", name: "SLA Notification", status: "active" },
]

const mockNotificationChain = [
  { type: "Email", recipient: "ops-team@company.com", status: "delivered", time: "2 min ago" },
  { type: "Slack", recipient: "#incidents", status: "delivered", time: "2 min ago" },
  { type: "SMS", recipient: "On-call Engineer", status: "delivered", time: "1 min ago" },
]

const mockEscalationChain = [
  { level: "L1", team: "Service Desk", status: "completed", time: "14:32" },
  { level: "L2", team: "Application Support", status: "completed", time: "14:45" },
  { level: "L3", team: "Engineering", status: "active", time: "15:02" },
]

export function TraceabilityPanel({ entityId, entityType }: TraceabilityPanelProps) {
  return (
    <div className="space-y-4">
      {/* Related Incidents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            Related Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockRelatedIncidents.map((incident) => (
              <Link
                key={incident.id}
                href={`/incidents/${incident.id}`}
                className="flex items-center justify-between rounded-lg border p-2 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-xs font-mono font-medium text-[#0D3133]">{incident.id}</p>
                  <p className="text-[10px] text-muted-foreground">{incident.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{incident.status}</Badge>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impacted Workflows */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            Impacted Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockImpactedWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div>
                  <p className="text-xs font-medium">{workflow.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{workflow.id}</p>
                </div>
                <Badge
                  variant={workflow.status === "active" ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {workflow.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Chain */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bell className="h-4 w-4 text-muted-foreground" />
            Notification Chain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockNotificationChain.map((notification, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-xs font-medium">{notification.type}</p>
                    <p className="text-[10px] text-muted-foreground">{notification.recipient}</p>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">{notification.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Escalation Chain */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Escalation Chain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockEscalationChain.map((escalation, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  escalation.status === "active" 
                    ? "bg-[#E69F50] text-white" 
                    : escalation.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {escalation.level}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{escalation.team}</p>
                  <p className="text-[10px] text-muted-foreground">{escalation.time}</p>
                </div>
                {index < mockEscalationChain.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Full Activity */}
      <Button variant="outline" className="w-full gap-2">
        <Activity className="h-4 w-4" />
        View Full Activity Log
      </Button>
    </div>
  )
}
