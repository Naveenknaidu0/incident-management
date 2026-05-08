"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ResponderStatusBadge } from "./responder-status-badge"
import { EscalationLevelBadge } from "./escalation-level-badge"
import {
  AlertTriangle,
  Users,
  Clock,
  Calendar,
  Layers,
  Phone,
  ArrowUpRight,
} from "lucide-react"

export function OnCallContextPanel() {
  return (
    <div className="space-y-4 p-4">
      {/* Active Escalations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Active Escalations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { id: "INC0042781", level: "L2" as const, time: "15m", priority: "critical" },
            { id: "INC0042780", level: "L3" as const, time: "45m", priority: "high" },
            { id: "INC0042779", level: "L1" as const, time: "5m", priority: "medium" },
          ].map((esc) => (
            <div key={esc.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#0D3133]">{esc.id}</span>
                <EscalationLevelBadge level={esc.level} />
              </div>
              <span className="text-xs text-muted-foreground">{esc.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Responders */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133] flex items-center gap-2">
            <Users className="h-4 w-4 text-[#0D3133]" />
            Current Responders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "Sarah Chen", initials: "SC", status: "available" as const, team: "Platform" },
            { name: "John Smith", initials: "JS", status: "busy" as const, team: "Database" },
            { name: "Emily Davis", initials: "ED", status: "available" as const, team: "Network" },
          ].map((responder) => (
            <div key={responder.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-[#0D3133] text-white text-[10px]">
                    {responder.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-[#0D3133]">{responder.name}</p>
                  <p className="text-xs text-muted-foreground">{responder.team}</p>
                </div>
              </div>
              <ResponderStatusBadge status={responder.status} showDot />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SLA Risks */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133] flex items-center gap-2">
            <Clock className="h-4 w-4 text-red-500" />
            SLA Risks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { id: "INC0042781", remaining: "15m", status: "warning" },
            { id: "INC0042778", remaining: "5m", status: "breach" },
          ].map((sla) => (
            <div key={sla.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
              <span className="font-mono text-xs text-[#0D3133]">{sla.id}</span>
              <Badge variant={sla.status === "breach" ? "destructive" : "outline"} className="text-xs">
                {sla.remaining}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Coverage Gaps */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500" />
            Coverage Gaps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-2 bg-amber-50 rounded text-sm">
            <p className="font-medium text-amber-800">Database Team</p>
            <p className="text-xs text-amber-600">Jan 18, 2:00 AM - 6:00 AM</p>
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Find Backup
          </Button>
        </CardContent>
      </Card>

      {/* Impacted Services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133] flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#73847B]" />
            Impacted Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {["Payment Gateway", "Core Database", "Auth Service"].map((service) => (
            <div key={service} className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="text-sm text-[#0D3133]">{service}</span>
              <Badge variant="outline" className="text-xs">3 incidents</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <Phone className="h-3 w-3" />
            Page All
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1">
            <ArrowUpRight className="h-3 w-3" />
            Escalate
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
