"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, Globe, Zap } from "lucide-react"

interface ImpactedService {
  name: string
  status: "critical" | "degraded" | "offline"
  affectedUsers: number
  regions: string[]
  percentageImpact: number
}

const impactedServices: ImpactedService[] = [
  {
    name: "Payment Processing",
    status: "critical",
    affectedUsers: 125000,
    regions: ["US-East", "EU-West"],
    percentageImpact: 85
  },
  {
    name: "Checkout Service",
    status: "degraded",
    affectedUsers: 45000,
    regions: ["US-West"],
    percentageImpact: 35
  },
  {
    name: "API Gateway",
    status: "degraded",
    affectedUsers: 12000,
    regions: ["APAC"],
    percentageImpact: 15
  },
]

const statusColors = {
  critical: "bg-red-100 text-red-700 border-red-200",
  degraded: "bg-orange-100 text-orange-700 border-orange-200",
  offline: "bg-red-100 text-red-700 border-red-200",
}

export function ServiceImpactPanel() {
  const totalAffected = impactedServices.reduce((sum, s) => sum + s.affectedUsers, 0)

  return (
    <Card>
      <CardHeader className="py-3 px-4 border-b">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-red-600" />
          <CardTitle className="text-sm">Service Impact</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {impactedServices.map((service) => (
            <div key={service.name} className="px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{service.name}</span>
                  <Badge className={`text-xs px-1.5 py-0.5 h-5 border ${statusColors[service.status]}`}>
                    {service.status}
                  </Badge>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{service.percentageImpact}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    service.status === "critical"
                      ? "bg-red-600"
                      : "bg-orange-600"
                  }`}
                  style={{ width: `${service.percentageImpact}%` }}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {service.affectedUsers.toLocaleString()} users
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  {service.regions.join(", ")}
                </div>
              </div>
            </div>
          ))}
          <div className="px-4 py-2 bg-muted/40">
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Total affected: {totalAffected.toLocaleString()} users
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
