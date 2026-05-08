"use client"

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Service {
  name: string
  status: "operational" | "degraded" | "outage"
  latency?: string
}

const services: Service[] = [
  { name: "API Gateway", status: "operational", latency: "23ms" },
  { name: "Database Cluster", status: "degraded", latency: "156ms" },
  { name: "Payment Service", status: "outage" },
  { name: "Auth Service", status: "operational", latency: "45ms" },
  { name: "CDN", status: "operational", latency: "12ms" },
  { name: "Search API", status: "degraded", latency: "340ms" },
  { name: "Email Service", status: "operational", latency: "89ms" },
  { name: "Notification Service", status: "operational", latency: "67ms" },
]

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Operational",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    label: "Degraded",
  },
  outage: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    label: "Outage",
  },
}

export function ServiceHealthPanel() {
  const operational = services.filter((s) => s.status === "operational").length
  const degraded = services.filter((s) => s.status === "degraded").length
  const outage = services.filter((s) => s.status === "outage").length

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-card-foreground">Service Health</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-3 w-3" />
            {operational}
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <AlertTriangle className="h-3 w-3" />
            {degraded}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <XCircle className="h-3 w-3" />
            {outage}
          </span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {services.map((service) => {
          const config = statusConfig[service.status]
          const Icon = config.icon

          return (
            <div
              key={service.name}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/30",
                service.status !== "operational" && config.bg
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", config.color)} />
                <span className="text-sm font-medium text-card-foreground">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {service.latency && (
                  <span className="text-xs font-mono text-muted-foreground">{service.latency}</span>
                )}
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-xs font-medium",
                    config.bg,
                    config.color
                  )}
                >
                  {config.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
