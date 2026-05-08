"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponderStatusBadge } from "./responder-status-badge"
import { EscalationLevelBadge } from "./escalation-level-badge"
import { Phone, MessageSquare, AlertTriangle, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ResponderCardProps {
  responder: {
    id: string
    name: string
    initials: string
    team: string
    role: string
    status: "available" | "busy" | "offline" | "escalated" | "in-major-incident"
    escalationLevel: "L1" | "L2" | "L3" | "manager" | "executive"
    activeIncidents: number
    currentShift: string
    phone: string
    email: string
  }
  onPage?: () => void
  onEscalate?: () => void
}

export function ResponderCard({ responder, onPage, onEscalate }: ResponderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[#0D3133] text-white text-sm">
              {responder.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium text-sm text-[#0D3133] truncate">{responder.name}</h4>
              <ResponderStatusBadge status={responder.status} />
            </div>
            <p className="text-xs text-muted-foreground truncate">{responder.role}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">{responder.team}</Badge>
              <EscalationLevelBadge level={responder.escalationLevel} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">{responder.activeIncidents}</span> active incidents
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={onPage}
                  title="Page Responder"
                >
                  <Phone className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  title="Send Message"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={onEscalate}
                  title="Escalate"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Assign Incident</DropdownMenuItem>
                    <DropdownMenuItem>Set Availability</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
