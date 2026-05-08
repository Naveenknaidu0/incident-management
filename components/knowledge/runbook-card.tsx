"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Clock, CheckCircle, Users } from "lucide-react"

interface RunbookCardProps {
  id: string
  title: string
  type: "outage-recovery" | "database-restart" | "network-recovery" | "vpn-troubleshooting" | "service-restart"
  steps: number
  estimatedTime: string
  successRate: number
  lastUsed: string
}

const typeConfig = {
  "outage-recovery": { label: "Outage Recovery", color: "bg-red-50 text-red-700" },
  "database-restart": { label: "Database Restart", color: "bg-purple-50 text-purple-700" },
  "network-recovery": { label: "Network Recovery", color: "bg-blue-50 text-blue-700" },
  "vpn-troubleshooting": { label: "VPN Troubleshooting", color: "bg-indigo-50 text-indigo-700" },
  "service-restart": { label: "Service Restart", color: "bg-green-50 text-green-700" },
}

export function RunbookCard({
  id,
  title,
  type,
  steps,
  estimatedTime,
  successRate,
  lastUsed,
}: RunbookCardProps) {
  return (
    <Card className="h-full transition-all hover:border-[#E69F50]/50 hover:shadow-sm">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0D3133]/5">
            <BookOpen className="h-4 w-4 text-[#0D3133]" />
          </div>
          <Badge variant="secondary" className={typeConfig[type].color}>
            {typeConfig[type].label}
          </Badge>
        </div>

        <Link href={`/knowledge/runbooks/${id}`} className="mt-3 flex-1">
          <h4 className="line-clamp-2 text-sm font-semibold text-[#0D3133] hover:underline">
            {title}
          </h4>
        </Link>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {steps} steps
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {estimatedTime}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle className="h-3 w-3" />
            {successRate}% success
          </span>
          <Button size="sm" className="h-7 gap-1 bg-[#0D3133] text-xs hover:bg-[#0D3133]/90">
            <Play className="h-3 w-3" />
            Execute
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
