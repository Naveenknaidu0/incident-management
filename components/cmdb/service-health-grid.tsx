"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceHealthBadge } from "./service-health-badge"
import { AlertCircle, Activity, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceHealth {
  id: string
  name: string
  status: "operational" | "degraded" | "partial-outage" | "major-outage" | "maintenance"
  uptime: string
  activeIncidents: number
  trend: "up" | "down" | "stable"
}

interface ServiceHealthGridProps {
  services: ServiceHealth[]
  title?: string
}

export function ServiceHealthGrid({ services, title = "Service Health" }: ServiceHealthGridProps) {
  return (
    <Card>
      <CardHeader className="border-b bg-muted/30 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-[#E69F50]" />
            {title}
          </CardTitle>
          <Link
            href="/cmdb/services"
            className="text-xs text-muted-foreground hover:text-[#E69F50]"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/cmdb/services/${service.id}`}
              className={cn(
                "group rounded-lg border p-3 transition-all hover:border-[#E69F50]/50 hover:shadow-sm",
                service.status === "major-outage" && "border-red-200 bg-red-50/30",
                service.status === "partial-outage" && "border-orange-200 bg-orange-50/30",
                service.status === "degraded" && "border-amber-200 bg-amber-50/30"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#0D3133] group-hover:text-[#E69F50]">
                    {service.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <ServiceHealthBadge status={service.status} size="sm" />
                  </div>
                </div>
                {service.activeIncidents > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-700">
                    <AlertCircle className="h-3 w-3" />
                    {service.activeIncidents}
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Uptime: {service.uptime}</span>
                <span className={cn(
                  "flex items-center gap-0.5",
                  service.trend === "up" && "text-green-600",
                  service.trend === "down" && "text-red-600"
                )}>
                  <TrendingUp className={cn(
                    "h-3 w-3",
                    service.trend === "down" && "rotate-180"
                  )} />
                  {service.trend}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
