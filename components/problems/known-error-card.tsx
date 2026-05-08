"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Bug,
  Link2,
  Server,
  CheckCircle,
  Clock,
  ExternalLink,
  Wrench,
} from "lucide-react"

interface KnownError {
  id: string
  title: string
  workaround: string
  linkedIncidents: number
  affectedServices: string[]
  permanentFixStatus: "not-started" | "in-progress" | "testing" | "scheduled" | "deployed"
  createdAt: string
}

interface KnownErrorCardProps {
  error: KnownError
  className?: string
}

const fixStatusConfig: Record<KnownError["permanentFixStatus"], { label: string; color: string }> = {
  "not-started": { label: "Not Started", color: "bg-slate-100 text-slate-700" },
  "in-progress": { label: "In Progress", color: "bg-blue-50 text-blue-700" },
  testing: { label: "Testing", color: "bg-purple-50 text-purple-700" },
  scheduled: { label: "Scheduled", color: "bg-amber-50 text-amber-700" },
  deployed: { label: "Deployed", color: "bg-green-50 text-green-700" },
}

export function KnownErrorCard({ error, className }: KnownErrorCardProps) {
  const fixStatus = fixStatusConfig[error.permanentFixStatus]

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <Bug className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{error.id}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", fixStatus.color)}>
                  {fixStatus.label}
                </span>
              </div>
              <h4 className="mt-1 text-sm font-medium text-foreground line-clamp-1">
                {error.title}
              </h4>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  {error.linkedIncidents} incidents
                </span>
                <span className="flex items-center gap-1">
                  <Server className="h-3 w-3" />
                  {error.affectedServices.length} services
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {error.createdAt}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Workaround Section */}
        <div className="mt-3 rounded-md bg-amber-50 border border-amber-100 p-2.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700">
            <Wrench className="h-3 w-3" />
            Workaround Available
          </div>
          <p className="mt-1 text-xs text-amber-800 line-clamp-2">{error.workaround}</p>
        </div>

        {/* Affected Services */}
        <div className="mt-3 flex flex-wrap gap-1">
          {error.affectedServices.slice(0, 3).map((service) => (
            <Badge key={service} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {error.affectedServices.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{error.affectedServices.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
