"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  Building2,
  Clock,
  Link2,
  Users,
  GitBranch,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react"

interface ActiveEscalation {
  id: string
  level: string
  target: string
  time: string
}

interface ImpactedCustomer {
  id: string
  name: string
  tier: "enterprise" | "business" | "standard"
  status: "escalated" | "notified" | "monitoring"
}

interface SLARisk {
  id: string
  type: string
  remaining: string
  status: "breach" | "warning" | "safe"
}

interface RelatedIncident {
  id: string
  title: string
  severity: string
  status: string
}

interface ResponderActivity {
  id: string
  name: string
  avatar?: string
  action: string
  time: string
}

interface ServiceDependency {
  id: string
  name: string
  type: "upstream" | "downstream"
  status: "healthy" | "degraded" | "outage"
}

interface RightOpsPanelProps {
  escalations: ActiveEscalation[]
  customers: ImpactedCustomer[]
  slaRisks: SLARisk[]
  relatedIncidents: RelatedIncident[]
  responderActivity: ResponderActivity[]
  dependencies: ServiceDependency[]
  className?: string
}

const tierColors = {
  enterprise: "bg-purple-100 text-purple-700",
  business: "bg-blue-100 text-blue-700",
  standard: "bg-slate-100 text-slate-600",
}

const statusColors = {
  escalated: "bg-red-100 text-red-700",
  notified: "bg-amber-100 text-amber-700",
  monitoring: "bg-green-100 text-green-700",
  healthy: "text-green-600",
  degraded: "text-amber-600",
  outage: "text-red-600",
}

const slaColors = {
  breach: "text-red-600 bg-red-50",
  warning: "text-amber-600 bg-amber-50",
  safe: "text-green-600 bg-green-50",
}

export function RightOpsPanel({
  escalations,
  customers,
  slaRisks,
  relatedIncidents,
  responderActivity,
  dependencies,
  className,
}: RightOpsPanelProps) {
  return (
    <div className={cn("space-y-3 h-full overflow-y-auto scrollbar-thin p-4", className)}>
      {/* Active Escalations */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <ArrowUpRight className="h-3.5 w-3.5 text-orange-500" />
            Active Escalations
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 ml-auto">
              {escalations.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {escalations.map((esc) => (
            <div key={esc.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {esc.level}
                </Badge>
                <span className="text-muted-foreground truncate max-w-[100px]">{esc.target}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{esc.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Impacted Customers */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-[#0D3133]" />
            Impacted Customers
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto">
              {customers.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {customers.slice(0, 5).map((customer) => (
            <div key={customer.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate max-w-[100px]">{customer.name}</span>
                <Badge className={cn("text-[10px] px-1 py-0", tierColors[customer.tier])}>
                  {customer.tier}
                </Badge>
              </div>
              <Badge className={cn("text-[10px] px-1.5 py-0", statusColors[customer.status])}>
                {customer.status}
              </Badge>
            </div>
          ))}
          {customers.length > 5 && (
            <Button variant="ghost" size="sm" className="w-full h-6 text-[10px]">
              View all {customers.length} customers
            </Button>
          )}
        </CardContent>
      </Card>

      {/* SLA Risks */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            SLA Risks
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {slaRisks.map((risk) => (
            <div key={risk.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
              <span className="text-muted-foreground">{risk.type}</span>
              <span className={cn("font-mono text-[11px] px-1.5 py-0.5 rounded", slaColors[risk.status])}>
                {risk.remaining}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Incidents */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <Link2 className="h-3.5 w-3.5 text-blue-500" />
            Related Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {relatedIncidents.map((inc) => (
            <div key={inc.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-muted-foreground">{inc.id}</span>
                <span className="truncate max-w-[140px]">{inc.title}</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Responder Activity */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-green-500" />
            Responder Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {responderActivity.slice(0, 4).map((activity) => (
            <div key={activity.id} className="flex items-center gap-2 text-xs py-1 border-b border-border last:border-0">
              <Avatar className="h-5 w-5">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                  {activity.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <span className="text-muted-foreground truncate">{activity.action}</span>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Service Dependencies */}
      <Card>
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-xs font-medium flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-purple-500" />
            Service Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-3 pt-0 space-y-1.5">
          {dependencies.map((dep) => (
            <div key={dep.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-1 py-0">
                  {dep.type === "upstream" ? "↑" : "↓"}
                </Badge>
                <span className="truncate max-w-[100px]">{dep.name}</span>
              </div>
              <span className={cn("text-[10px] font-medium", statusColors[dep.status])}>
                {dep.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
