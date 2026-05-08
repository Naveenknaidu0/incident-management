"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceHealthBadge } from "./service-health-badge"
import {
  AlertCircle,
  GitBranch,
  Clock,
  User,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Server,
  Database,
} from "lucide-react"
import Link from "next/link"

interface RelatedIncident {
  id: string
  title: string
  priority: "critical" | "high" | "medium" | "low"
  status: string
}

interface DependencyAlert {
  service: string
  status: "degraded" | "outage"
  since: string
}

interface CMDBContextPanelProps {
  relatedIncidents: RelatedIncident[]
  dependencyAlerts: DependencyAlert[]
  owner: {
    name: string
    team: string
    email: string
    phone?: string
  }
  escalationContacts: { name: string; role: string }[]
}

export function CMDBContextPanel({
  relatedIncidents,
  dependencyAlerts,
  owner,
  escalationContacts,
}: CMDBContextPanelProps) {
  return (
    <div className="space-y-4">
      {/* Dependency Alerts */}
      {dependencyAlerts.length > 0 && (
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="py-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-800">
              <GitBranch className="h-4 w-4" />
              Dependency Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            {dependencyAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  {alert.status === "outage" ? (
                    <Server className="h-4 w-4 text-red-500" />
                  ) : (
                    <Database className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm font-medium">{alert.service}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ServiceHealthBadge
                    status={alert.status === "outage" ? "major-outage" : "degraded"}
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground">{alert.since}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Related Incidents */}
      <Card>
        <CardHeader className="border-b bg-muted/30 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <AlertCircle className="h-4 w-4 text-[#E69F50]" />
              Related Incidents
            </CardTitle>
            <Badge variant="secondary">{relatedIncidents.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {relatedIncidents.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No active incidents</p>
          ) : (
            relatedIncidents.slice(0, 5).map((incident) => (
              <Link
                key={incident.id}
                href={`/incidents/${incident.id}`}
                className="group flex items-start justify-between rounded-lg border px-3 py-2 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                    {incident.id}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{incident.title}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    incident.priority === "critical"
                      ? "bg-red-100 text-red-700"
                      : incident.priority === "high"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-slate-100 text-slate-700"
                  }
                >
                  {incident.priority}
                </Badge>
              </Link>
            ))
          )}
          {relatedIncidents.length > 5 && (
            <Button variant="ghost" size="sm" className="w-full">
              View all {relatedIncidents.length} incidents
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Ownership */}
      <Card>
        <CardHeader className="border-b bg-muted/30 py-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <User className="h-4 w-4 text-[#E69F50]" />
            Ownership
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          <div>
            <p className="text-sm font-medium text-[#0D3133]">{owner.name}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              {owner.team}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href={`mailto:${owner.email}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#E69F50]"
            >
              <Mail className="h-3 w-3" />
              {owner.email}
            </a>
            {owner.phone && (
              <a
                href={`tel:${owner.phone}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#E69F50]"
              >
                <Phone className="h-3 w-3" />
                {owner.phone}
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Escalation Contacts */}
      <Card>
        <CardHeader className="border-b bg-muted/30 py-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Clock className="h-4 w-4 text-[#E69F50]" />
            Escalation Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {escalationContacts.map((contact, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
