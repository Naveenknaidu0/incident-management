"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Siren, Clock, Users, ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface MajorIncident {
  id: string
  title: string
  status: "active" | "mitigating" | "resolved"
  priority: "P1" | "P2"
  duration: string
  impactedServices: string[]
  commander: string
  updates: number
}

const majorIncidents: MajorIncident[] = [
  {
    id: "MIM0000234",
    title: "Payment Gateway Complete Outage - EU Region",
    status: "mitigating",
    priority: "P1",
    duration: "2h 34m",
    impactedServices: ["Payment Gateway", "Order Processing"],
    commander: "Sarah Chen",
    updates: 8,
  },
  {
    id: "MIM0000233",
    title: "Database Cluster Degradation - Primary DC",
    status: "active",
    priority: "P1",
    duration: "45m",
    impactedServices: ["Core Database", "API Gateway", "Search"],
    commander: "Mike Rodriguez",
    updates: 4,
  },
  {
    id: "MIM0000232",
    title: "Authentication Service Latency",
    status: "resolved",
    priority: "P2",
    duration: "1h 12m",
    impactedServices: ["Authentication"],
    commander: "Lisa Park",
    updates: 6,
  },
]

const statusStyles = {
  active: "bg-red-500 animate-pulse",
  mitigating: "bg-amber-500",
  resolved: "bg-green-500",
}

const statusLabels = {
  active: "Active",
  mitigating: "Mitigating",
  resolved: "Resolved",
}

export function MajorIncidentsWidget() {
  const activeCount = majorIncidents.filter(i => i.status !== "resolved").length

  return (
    <Card className={cn(activeCount > 0 && "border-red-200")}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Siren className={cn("h-4 w-4", activeCount > 0 ? "text-red-500" : "text-muted-foreground")} />
          <CardTitle className="text-sm font-semibold">Major Incidents</CardTitle>
          {activeCount > 0 && (
            <Badge variant="destructive" className="text-[10px]">
              {activeCount} Active
            </Badge>
          )}
        </div>
        <Link href="/incidents/major" className="flex items-center gap-1 text-xs text-[#E69F50] hover:underline">
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {majorIncidents.map((incident) => (
          <div
            key={incident.id}
            className={cn(
              "rounded-lg border p-3 transition-colors hover:bg-muted/50",
              incident.status === "active" && "border-red-200 bg-red-50",
              incident.status === "mitigating" && "border-amber-200 bg-amber-50"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusStyles[incident.status])} />
                  <span className="font-mono text-[10px] text-muted-foreground">{incident.id}</span>
                  <Badge variant="outline" className="text-[9px] px-1 py-0">
                    {incident.priority}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs font-medium">{incident.title}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {incident.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {incident.commander}
                  </span>
                  <span>{incident.updates} updates</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
            {incident.impactedServices.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {incident.impactedServices.map((service) => (
                  <Badge key={service} variant="secondary" className="text-[9px] px-1.5 py-0">
                    {service}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
