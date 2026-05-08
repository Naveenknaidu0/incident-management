"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceHealthBadge } from "./service-health-badge"
import { EnvironmentBadge } from "./environment-badge"
import { 
  GitBranch, 
  AlertCircle, 
  User,
  ArrowRight
} from "lucide-react"

interface ServiceCardProps {
  id: string
  name: string
  owner: string
  status: "operational" | "degraded" | "partial-outage" | "major-outage" | "maintenance"
  environment: "production" | "staging" | "qa" | "development" | "dr"
  dependencyCount: number
  activeIncidents: number
  description?: string
}

export function ServiceCard({
  id,
  name,
  owner,
  status,
  environment,
  dependencyCount,
  activeIncidents,
}: ServiceCardProps) {
  return (
    <Link href={`/cmdb/services/${id}`}>
      <Card className="group cursor-pointer transition-all hover:border-[#E69F50]/50 hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-[#0D3133] group-hover:text-[#E69F50]">
                  {name}
                </h3>
                <EnvironmentBadge environment={environment} />
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span className="truncate">{owner}</span>
              </div>
            </div>
            <ServiceHealthBadge status={status} showLabel={false} />
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <GitBranch className="h-3.5 w-3.5" />
              <span>{dependencyCount} deps</span>
            </div>
            {activeIncidents > 0 && (
              <div className="flex items-center gap-1 text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{activeIncidents} incidents</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end">
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              View details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
