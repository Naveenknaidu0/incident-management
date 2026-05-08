"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EscalationLevelBadge } from "./escalation-level-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { SLATimer } from "@/components/ui/sla-timer"
import { Clock, User, ArrowUpRight, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface EscalationCardProps {
  escalation: {
    id: string
    incidentId: string
    incidentTitle: string
    priority: "critical" | "high" | "medium" | "low"
    level: "L1" | "L2" | "L3" | "manager" | "executive"
    assignedTo: { name: string; initials: string }
    elapsedTime: string
    sla: { remaining: string; status: "safe" | "warning" | "breach" | "breached" }
    service: string
    triggeredAt: string
  }
  onAcknowledge?: () => void
  onEscalate?: () => void
}

export function EscalationCard({ escalation, onAcknowledge, onEscalate }: EscalationCardProps) {
  return (
    <Card className={`border-l-4 ${
      escalation.priority === "critical" ? "border-l-red-500" :
      escalation.priority === "high" ? "border-l-orange-500" :
      escalation.priority === "medium" ? "border-l-amber-500" : "border-l-green-500"
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/incidents/${escalation.incidentId}`}
                className="font-mono text-sm font-medium text-[#0D3133] hover:underline"
              >
                {escalation.incidentId}
              </Link>
              <PriorityBadge priority={escalation.priority} showLabel={false} />
              <EscalationLevelBadge level={escalation.level} />
            </div>
            <p className="text-sm text-foreground truncate">{escalation.incidentTitle}</p>
            <p className="text-xs text-muted-foreground mt-1">{escalation.service}</p>
          </div>
          <SLATimer remaining={escalation.sla.remaining} status={escalation.sla.status} />
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                  {escalation.assignedTo.initials}
                </AvatarFallback>
              </Avatar>
              <span>{escalation.assignedTo.name}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{escalation.elapsedTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onAcknowledge}>
              Acknowledge
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={onEscalate}>
              <ArrowUpRight className="h-3 w-3" />
              Escalate
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Reassign</DropdownMenuItem>
                <DropdownMenuItem>Page Backup</DropdownMenuItem>
                <DropdownMenuItem>View Incident</DropdownMenuItem>
                <DropdownMenuItem>Snooze</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
