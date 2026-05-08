"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Crown,
  Server,
  Code2,
  HeadphonesIcon,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

type StakeholderRole = "executive" | "service-owner" | "engineering-lead" | "support-lead" | "vendor"

interface Stakeholder {
  id: string
  name: string
  role: StakeholderRole
  title: string
  organization?: string
  avatar?: string
  status: "notified" | "acknowledged" | "engaged" | "pending"
  lastCommunication?: string
  notificationPreference: "email" | "sms" | "slack" | "teams"
}

interface StakeholderPanelProps {
  stakeholders: Stakeholder[]
  className?: string
  onNotify?: (stakeholderId: string) => void
}

const roleConfig: Record<StakeholderRole, { icon: typeof Crown; label: string; color: string }> = {
  executive: { icon: Crown, label: "Executive", color: "text-amber-600" },
  "service-owner": { icon: Server, label: "Service Owner", color: "text-blue-600" },
  "engineering-lead": { icon: Code2, label: "Engineering", color: "text-purple-600" },
  "support-lead": { icon: HeadphonesIcon, label: "Support", color: "text-green-600" },
  vendor: { icon: Building2, label: "Vendor", color: "text-slate-600" },
}

const statusConfig: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
  notified: { bg: "bg-blue-100", text: "text-blue-700", icon: Mail },
  acknowledged: { bg: "bg-amber-100", text: "text-amber-700", icon: CheckCircle },
  engaged: { bg: "bg-green-100", text: "text-green-700", icon: MessageSquare },
  pending: { bg: "bg-slate-100", text: "text-slate-600", icon: Clock },
}

const notificationIcons = {
  email: Mail,
  sms: Phone,
  slack: MessageSquare,
  teams: MessageSquare,
}

export function StakeholderPanel({ stakeholders, className, onNotify }: StakeholderPanelProps) {
  const groupedStakeholders = stakeholders.reduce((acc, stakeholder) => {
    if (!acc[stakeholder.role]) {
      acc[stakeholder.role] = []
    }
    acc[stakeholder.role].push(stakeholder)
    return acc
  }, {} as Record<StakeholderRole, Stakeholder[]>)

  return (
    <div className={cn("space-y-3", className)}>
      {(Object.keys(roleConfig) as StakeholderRole[]).map((role) => {
        const config = roleConfig[role]
        const Icon = config.icon
        const roleStakeholders = groupedStakeholders[role] || []

        if (roleStakeholders.length === 0) return null

        return (
          <Card key={role}>
            <CardHeader className="py-2 px-3">
              <CardTitle className="text-xs font-medium flex items-center gap-2">
                <Icon className={cn("h-3.5 w-3.5", config.color)} />
                {config.label}
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto">
                  {roleStakeholders.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 pt-0 space-y-2">
              {roleStakeholders.map((stakeholder) => {
                const status = statusConfig[stakeholder.status]
                const StatusIcon = status.icon
                const NotifIcon = notificationIcons[stakeholder.notificationPreference]

                return (
                  <div
                    key={stakeholder.id}
                    className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={stakeholder.avatar} />
                        <AvatarFallback className="text-[10px] bg-[#0D3133] text-white">
                          {stakeholder.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{stakeholder.name}</span>
                        <span className="text-[10px] text-muted-foreground">{stakeholder.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {stakeholder.lastCommunication && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {stakeholder.lastCommunication}
                        </span>
                      )}
                      <Badge className={cn("text-[10px] px-1.5 py-0", status.bg, status.text)}>
                        <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                        {stakeholder.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onNotify?.(stakeholder.id)}
                      >
                        <NotifIcon className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
