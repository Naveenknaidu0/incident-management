"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ServiceHealthBadge } from "./service-health-badge"
import { 
  AlertTriangle, 
  ArrowRight, 
  Users, 
  DollarSign,
  Clock,
  Building2
} from "lucide-react"

interface ImpactedService {
  id: string
  name: string
  status: "degraded" | "partial-outage" | "major-outage"
  impactLevel: "direct" | "indirect"
}

interface OutageImpactPanelProps {
  rootCause: string
  duration: string
  impactedServices: ImpactedService[]
  affectedUsers: number
  affectedRegions: string[]
  estimatedRevenueLoss?: string
  affectedBusinessUnits: string[]
}

export function OutageImpactPanel({
  rootCause,
  duration,
  impactedServices,
  affectedUsers,
  affectedRegions,
  estimatedRevenueLoss,
  affectedBusinessUnits,
}: OutageImpactPanelProps) {
  const directImpact = impactedServices.filter((s) => s.impactLevel === "direct")
  const indirectImpact = impactedServices.filter((s) => s.impactLevel === "indirect")

  return (
    <Card className="border-l-4 border-l-red-500">
      <CardHeader className="border-b bg-red-50/50 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-800">
            <AlertTriangle className="h-4 w-4" />
            Active Outage Impact
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Root Cause */}
        <div>
          <p className="text-xs font-medium text-muted-foreground">Root Cause</p>
          <p className="text-sm font-medium text-[#0D3133]">{rootCause}</p>
        </div>

        {/* Duration & Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-[#0D3133]">{duration}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Affected Users</span>
            </div>
            <p className="mt-1 text-lg font-semibold text-[#0D3133]">
              {affectedUsers.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Business Impact */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Business Impact</p>
          <div className="flex flex-wrap gap-2">
            {affectedBusinessUnits.map((unit) => (
              <Badge key={unit} variant="secondary" className="gap-1">
                <Building2 className="h-3 w-3" />
                {unit}
              </Badge>
            ))}
          </div>
          {estimatedRevenueLoss && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2">
              <DollarSign className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">
                Est. Revenue Impact: <strong>{estimatedRevenueLoss}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Affected Regions */}
        <div>
          <p className="text-xs font-medium text-muted-foreground">Affected Regions</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {affectedRegions.map((region) => (
              <Badge key={region} variant="outline" className="text-xs">
                {region}
              </Badge>
            ))}
          </div>
        </div>

        {/* Impact Chain */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Impact Propagation</p>
          
          {/* Direct Impact */}
          {directImpact.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-red-700">Direct Impact ({directImpact.length})</p>
              {directImpact.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded border border-red-200 bg-red-50/50 px-3 py-2"
                >
                  <span className="text-sm font-medium">{service.name}</span>
                  <ServiceHealthBadge status={service.status} />
                </div>
              ))}
            </div>
          )}

          {/* Indirect Impact */}
          {indirectImpact.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs font-medium text-amber-700">
                  Downstream Impact ({indirectImpact.length})
                </p>
              </div>
              {indirectImpact.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded border border-amber-200 bg-amber-50/50 px-3 py-2"
                >
                  <span className="text-sm font-medium">{service.name}</span>
                  <ServiceHealthBadge status={service.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
