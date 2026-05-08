"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, LinkIcon } from "lucide-react"

interface KnownErrorCardProps {
  id: string
  title: string
  affectedServices: string[]
  hasWorkaround: boolean
  linkedIncidents: number
  status: "open" | "in-progress" | "resolved"
  lastUpdated: string
}

export function KnownErrorCard({
  id,
  title,
  affectedServices,
  hasWorkaround,
  linkedIncidents,
  status,
  lastUpdated,
}: KnownErrorCardProps) {
  const statusConfig = {
    open: { label: "Open", color: "bg-red-50 text-red-700" },
    "in-progress": { label: "In Progress", color: "bg-amber-50 text-amber-700" },
    resolved: { label: "Resolved", color: "bg-green-50 text-green-700" },
  }

  return (
    <Link href={`/knowledge/known-errors/${id}`}>
      <Card className="h-full transition-all hover:border-[#E69F50]/50 hover:shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <Badge variant="secondary" className={statusConfig[status].color}>
              {statusConfig[status].label}
            </Badge>
          </div>

          <p className="mt-2 font-mono text-xs text-muted-foreground">{id}</p>
          <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-[#0D3133]">
            {title}
          </h4>

          <div className="mt-3 flex flex-wrap gap-1">
            {affectedServices.slice(0, 2).map((service) => (
              <Badge key={service} variant="outline" className="text-[10px]">
                {service}
              </Badge>
            ))}
            {affectedServices.length > 2 && (
              <Badge variant="outline" className="text-[10px]">
                +{affectedServices.length - 2}
              </Badge>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
            <div className="flex items-center gap-1">
              {hasWorkaround ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Workaround
                </span>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  No workaround
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-muted-foreground">
              <LinkIcon className="h-3 w-3" />
              {linkedIncidents} incidents
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
