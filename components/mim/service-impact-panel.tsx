"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Server,
  Globe,
  Users,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle,
  MinusCircle,
} from "lucide-react"

type ServiceStatus = "outage" | "degraded" | "operational"

interface ImpactedService {
  id: string
  name: string
  status: ServiceStatus
  outageDuration?: string
  affectedUsers?: number
  region?: string
  dependencies?: string[]
}

interface ImpactRegion {
  name: string
  status: ServiceStatus
  affectedUsers: number
}

interface ServiceImpactPanelProps {
  services: ImpactedService[]
  regions: ImpactRegion[]
  totalAffectedUsers: number
  affectedCustomers: number
  className?: string
}

const statusConfig: Record<ServiceStatus, { icon: typeof AlertTriangle; color: string; bg: string; label: string }> = {
  outage: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", label: "Outage" },
  degraded: { icon: MinusCircle, color: "text-amber-600", bg: "bg-amber-100", label: "Degraded" },
  operational: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Operational" },
}

export function ServiceImpactPanel({
  services,
  regions,
  totalAffectedUsers,
  affectedCustomers,
  className,
}: ServiceImpactPanelProps) {
  const outageCount = services.filter((s) => s.status === "outage").length
  const degradedCount = services.filter((s) => s.status === "degraded").length

  return (
    <div className={cn("space-y-4", className)}>
      {/* Impact Summary */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-3 text-center">
            <Server className="h-4 w-4 mx-auto text-red-600 mb-1" />
            <div className="text-lg font-bold text-red-700">{outageCount}</div>
            <div className="text-[10px] text-red-600 uppercase tracking-wide">Services Down</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-3 text-center">
            <MinusCircle className="h-4 w-4 mx-auto text-amber-600 mb-1" />
            <div className="text-lg font-bold text-amber-700">{degradedCount}</div>
            <div className="text-[10px] text-amber-600 uppercase tracking-wide">Degraded</div>
          </CardContent>
        </Card>
        <Card className="border-[#0D3133]/20 bg-[#0D3133]/5">
          <CardContent className="p-3 text-center">
            <Users className="h-4 w-4 mx-auto text-[#0D3133] mb-1" />
            <div className="text-lg font-bold text-[#0D3133]">{totalAffectedUsers.toLocaleString()}</div>
            <div className="text-[10px] text-[#0D3133] uppercase tracking-wide">Users Affected</div>
          </CardContent>
        </Card>
        <Card className="border-[#E69F50]/30 bg-[#E69F50]/10">
          <CardContent className="p-3 text-center">
            <Building2 className="h-4 w-4 mx-auto text-[#E69F50] mb-1" />
            <div className="text-lg font-bold text-[#E69F50]">{affectedCustomers}</div>
            <div className="text-[10px] text-[#73847B] uppercase tracking-wide">Customers</div>
          </CardContent>
        </Card>
      </div>

      {/* Impacted Services */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            Impacted Services
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <div className="space-y-2">
            {services.map((service) => {
              const config = statusConfig[service.status]
              const Icon = config.icon

              return (
                <div
                  key={service.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md border",
                    service.status === "outage" && "border-red-200 bg-red-50/50",
                    service.status === "degraded" && "border-amber-200 bg-amber-50/50",
                    service.status === "operational" && "border-green-200 bg-green-50/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1 rounded", config.bg)}>
                      <Icon className={cn("h-3 w-3", config.color)} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{service.name}</span>
                      {service.dependencies && service.dependencies.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          Deps: {service.dependencies.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {service.outageDuration && (
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {service.outageDuration}
                      </div>
                    )}
                    <Badge variant="outline" className={cn("text-[10px]", config.color)}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Affected Regions */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Affected Regions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <div className="space-y-2">
            {regions.map((region) => {
              const config = statusConfig[region.status]
              const Icon = config.icon

              return (
                <div
                  key={region.name}
                  className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-3.5 w-3.5", config.color)} />
                    <span className="text-xs font-medium">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {region.affectedUsers.toLocaleString()} users
                    </span>
                    <Badge variant="outline" className={cn("text-[10px]", config.color)}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
