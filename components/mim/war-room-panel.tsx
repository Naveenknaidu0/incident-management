"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Video,
  Phone,
  MessageSquare,
  Users,
  Headphones,
  ExternalLink,
  Check,
  Clock,
  Slack,
} from "lucide-react"

interface Responder {
  id: string
  name: string
  role: string
  team: string
  avatar?: string
  status: "active" | "away" | "offline"
  joinedAt?: string
}

interface SupportTeam {
  name: string
  members: number
  active: number
}

interface WarRoomPanelProps {
  bridgeCallActive?: boolean
  bridgeCallUrl?: string
  responders: Responder[]
  supportTeams: SupportTeam[]
  slackChannel?: string
  teamsChannel?: string
  className?: string
}

const statusColors = {
  active: "bg-green-500",
  away: "bg-amber-500",
  offline: "bg-slate-300",
}

export function WarRoomPanel({
  bridgeCallActive = true,
  bridgeCallUrl = "#",
  responders,
  supportTeams,
  slackChannel,
  teamsChannel,
  className,
}: WarRoomPanelProps) {
  const activeResponders = responders.filter((r) => r.status === "active").length

  return (
    <div className={cn("space-y-4", className)}>
      {/* Bridge Call Section */}
      <Card className="border-[#E69F50]/30 bg-[#E69F50]/5">
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Video className="h-4 w-4 text-[#E69F50]" />
                {bridgeCallActive && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <CardTitle className="text-sm font-medium">War Room Bridge</CardTitle>
            </div>
            <Badge variant="outline" className="text-[10px] border-green-500 text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {responders.slice(0, 4).map((r) => (
                  <Avatar key={r.id} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={r.avatar} />
                    <AvatarFallback className="text-[8px] bg-[#0D3133] text-white">
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {responders.length > 4 && (
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium border-2 border-white">
                    +{responders.length - 4}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{activeResponders} Active</span>
            </div>
            <Button size="sm" className="h-7 bg-[#E69F50] hover:bg-[#d18f40] text-[#0D3133]">
              <Headphones className="h-3 w-3 mr-1" />
              Join Call
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Responders */}
      <Card>
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Active Responders
            </CardTitle>
            <span className="text-xs text-muted-foreground">{responders.length} Total</span>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 space-y-2">
          {responders.map((responder) => (
            <div
              key={responder.id}
              className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={responder.avatar} />
                    <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                      {responder.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white",
                      statusColors[responder.status]
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{responder.name}</span>
                  <span className="text-[10px] text-muted-foreground">{responder.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {responder.team}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Teams */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Engaged Teams</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 space-y-2">
          {supportTeams.map((team) => (
            <div
              key={team.name}
              className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
            >
              <span className="text-xs font-medium">{team.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">
                  {team.active}/{team.members} active
                </span>
                <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(team.active / team.members) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Communication Channels</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 space-y-2">
          {slackChannel && (
            <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
              <Slack className="h-3.5 w-3.5 mr-2" />
              {slackChannel}
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          )}
          {teamsChannel && (
            <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
              <MessageSquare className="h-3.5 w-3.5 mr-2" />
              {teamsChannel}
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
