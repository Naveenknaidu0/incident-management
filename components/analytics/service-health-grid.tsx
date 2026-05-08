"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface ServiceHealth {
  name: string
  status: "operational" | "degraded" | "outage"
  uptime: number
  incidents: number
  trend: "up" | "down" | "stable"
}

const services: ServiceHealth[] = [
  { name: "Payment Gateway", status: "operational", uptime: 99.98, incidents: 3, trend: "up" },
  { name: "Authentication", status: "operational", uptime: 99.99, incidents: 1, trend: "stable" },
  { name: "Core Database", status: "degraded", uptime: 99.85, incidents: 5, trend: "down" },
  { name: "API Gateway", status: "operational", uptime: 99.95, incidents: 2, trend: "up" },
  { name: "CDN", status: "operational", uptime: 99.99, incidents: 0, trend: "stable" },
  { name: "Email Service", status: "outage", uptime: 98.50, incidents: 8, trend: "down" },
  { name: "Search Engine", status: "operational", uptime: 99.92, incidents: 2, trend: "up" },
  { name: "Analytics", status: "operational", uptime: 99.96, incidents: 1, trend: "stable" },
]

const statusStyles = {
  operational: "bg-green-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
}

const statusLabels = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
}

export function ServiceHealthGrid() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">Service Health</CardTitle>
        </div>
        <Link href="/services" className="flex items-center gap-1 text-xs text-[#E69F50] hover:underline">
          View All
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <div
              key={service.name}
              className={cn(
                "rounded-lg border border-border p-3 transition-colors hover:bg-muted/50",
                service.status === "outage" && "border-red-200 bg-red-50",
                service.status === "degraded" && "border-amber-200 bg-amber-50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", statusStyles[service.status])} />
                  <span className="text-xs font-medium">{service.name}</span>
                </div>
                {service.trend !== "stable" && (
                  service.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  {service.uptime}% uptime
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {service.incidents} incidents
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
